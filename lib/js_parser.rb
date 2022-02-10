require 'match_uri'

class JsParser
  META_START_COMMENT = '// ==UserScript=='
  META_END_COMMENT = '// ==/UserScript=='

  TLD_EXPANSION = ['com', 'net', 'org', 'de', 'co.uk']
  APPLIES_TO_ALL_PATTERNS = ['http://*', 'https://*', 'http://*/*', 'https://*/*', 'http*://*', 'http*://*/*', '*', '*://*', '*://*/*', 'http*']

  class << self
    def get_meta_block(c)
      return nil if c.nil?
      start_block = c.index(META_START_COMMENT)
      return nil if start_block.nil?
      end_block = c.index(META_END_COMMENT, start_block)
      return nil if end_block.nil?
      return c[start_block..end_block+META_END_COMMENT.length]
    end

    # Returns the meta for this script in a hash of key to array of values
    def parse_meta(c)
      meta = {}
      meta_block = get_meta_block(c)
      return meta if meta_block.nil?
      # can these be multiline?
      meta_block.split("\n").each do |meta_line|
        meta_match = /\/\/\s+@([a-zA-Z\:\-]+)\s+(.*)/.match(meta_line)
        next if meta_match.nil?
        key = meta_match[1].strip
        value = meta_match[2].strip
        if meta.has_key?(key)
          meta[key] << value
        else
          meta[key] = [value]
        end
      end
      return meta
    end

    # Returns a two-element array: code before the meta block, code after
    def get_code_blocks(c)
      meta_start = c.index(META_START_COMMENT)
      return [c, ""] if meta_start.nil?
      meta_end = c.index(META_END_COMMENT, meta_start) + META_END_COMMENT.length
      return [(meta_start == 0 ? '' : c[0..meta_start-1]), c[meta_end..c.length]]
    end

    # Inserts, changes, or deletes meta values in the code and returns the entire code
    def inject_meta(c, replacements, additions_if_missing = {})
      meta_block = get_meta_block(c)
      return nil if meta_block.nil?

      # handle strings or symbols as the keys
      replacement_keys = replacements.keys.map{|s|s.to_s}
      replacements = replacements.with_indifferent_access
      additions_if_missing = additions_if_missing.with_indifferent_access
      # replace any existing values
      meta_lines = meta_block.split("\n").map do |meta_line|
        meta_match = /\/\/\s+@([a-zA-Z]+)\s+(.*)/.match(meta_line)
        next meta_line if meta_match.nil?
        key = meta_match[1].strip
        value = meta_match[2].strip
        additions_if_missing.delete(key)
        # replace the first one, remove any subsequent ones
        if replacement_keys.include?(key)
          if replacements.has_key?(key) and !value.nil?
            replacement = replacements.delete(key)
            next nil if replacement.nil?
            next meta_line.sub(value, replacement)
          end
          next nil
        end
        next meta_line
      end

      meta_lines.compact!

      # add new values
      replacements.update(additions_if_missing)
      if !replacements.empty?
        # nils here would indicate a removal that wasn't there, so ignore that
        new_lines = replacements.delete_if{|k,v|v.nil?}.map { |k, v| "// @#{k} #{v}" }
        close_meta = meta_lines.pop
        meta_lines.concat(new_lines)
        meta_lines << close_meta
      end

      code_blocks = get_code_blocks(c)
      return code_blocks[0] + meta_lines.join("\n") + code_blocks[1]
    end

    # Returns an object with:
    # - :text
    # - :domain - boolean - is text a domain?
    # - :tld_extra - boolean - is this extra entries added because of .tld?
    def calculate_applies_to_names(code)
      meta = parse_meta(code)
      patterns = []
      meta.each { |k, v| patterns.concat(v) if ['include', 'match'].include?(k) }

      return [] if patterns.empty?
      return [] if !(patterns & APPLIES_TO_ALL_PATTERNS).empty?

      applies_to_names = []
      patterns.each do |p|
        original_pattern = p

        # regexp - starts and ends with /
        if p.match(/^\/.*\/$/).present?

          # unescape slashes, then grab between the first slash (start of regexp) and the fourth (after domain)
          slash_parts = p.gsub(/\\\//, '/').split("/")

          if slash_parts.length < 4
            # not a full url regexp
            pre_wildcard = nil
          else
            pre_wildcard = slash_parts[1..3].join("/")

            # get rid of escape sequences
            pre_wildcard.gsub!(/\\(.)/, '\1')

            # start of string
            pre_wildcard.gsub!(/^\^/, '')

            # https?:
            pre_wildcard.gsub!(/^https\?:/, 'http:')

            # https*:
            pre_wildcard.gsub!(/^https\*:/, 'http:')

            # wildcarded subdomain ://.*
            pre_wildcard.gsub!(/:\/\/\.\*/, '://')

            # remove optional groups
            pre_wildcard.gsub!(/\([^\)]+\)[\?\*]/, '')

            # if there's weird characters left, it's no good
            pre_wildcard = nil if /[\[\]\*\{\}\^\+\?\(\)]/.match(pre_wildcard).present?
          end

        else

          # senseless wildcard before protocol
          m = p.match(/^\*(https?:.*)/i)
          p = m[1] if !m.nil?

          # protocol wild-cards
          p = p.sub(/^\*:/i, 'http:')
          p = p.sub(/^\*\/\//i, 'http://')
          p = p.sub(/^http\*:/i, 'http:')

          # skipping the protocol slashes
          p = p.sub(/^(https?):([^\/])/i, '\1://\2')

          # subdomain wild-cards - http://*.example.com and http://*example.com
          m = p.match(/^([a-z]+:\/\/)\*\.?([a-z0-9\-]+(?:.[a-z0-9\-]+)+.*)/i)
          p = m[1] + m[2] if !m.nil?

          # protocol and subdomain wild-cards - *example.com and *.example.com
          m = p.match(/^\*\.?([a-z0-9\-]+\.[a-z0-9\-]+.*)/i)
          p = 'http://' + m[1] if !m.nil?

          # protocol and subdomain wild-cards - http*.example.com, http*example.com, http*//example.com
          m = p.match(/^http\*(?:\/\/)?\.?((?:[a-z0-9\-]+)(?:\.[a-z0-9\-]+)+.*)/i)
          p = 'http://' + m[1] if !m.nil?

          # tld wildcards - http://example.* - switch to .tld. don't switch if it's an ip address, though
          m = p.match(/^([a-z]+:\/\/([a-z0-9\-]+(?:\.[a-z0-9\-]+)*\.))\*(.*)/)
          if !m.nil? && m[2].match(/\A([0-9]+\.){2,}\z/).nil?
            p = m[1] + 'tld' + m[3]
            # grab up to the first *
            pre_wildcard = p.split('*').first
          else
            pre_wildcard = p
          end
        end

        begin
          uri = URI(pre_wildcard)
          if uri.host.nil?
            applies_to_names << {text: original_pattern, domain: false, tld_extra: false}
          elsif !uri.host.include?('.') || uri.host.include?('*')
            # ensure the host is something sane
            applies_to_names << {text: original_pattern, domain: false, tld_extra: false}
          else
            if uri.host.ends_with?('.tld')
              TLD_EXPANSION.each_with_index do |tld, i|
                applies_to_names << {text: MatchURI.get_tld_plus_1(uri.host.sub(/tld$/i, tld)), domain: true, tld_extra: i != 0}
              end
              # "example.com."
            elsif uri.host.ends_with?('.')
              applies_to_names << {text: MatchURI.get_tld_plus_1(uri.host[0, uri.host.length - 1]), domain: true, tld_extra: false}
            else
              applies_to_names << {text: MatchURI.get_tld_plus_1(uri.host), domain: true, tld_extra: false}
            end
          end
        rescue ArgumentError
          Rails.logger.warn "Unrecognized pattern '" + p + "'"
          applies_to_names << {text: original_pattern, domain: false, tld_extra: false}
        rescue URI::InvalidURIError
          Rails.logger.warn "Unrecognized pattern '" + p + "'"
          applies_to_names << {text: original_pattern, domain: false, tld_extra: false}
        end
      end
      # If there's a tld_extra and a not-tld_extra for the same text, remove the tld_extra
      applies_to_names.delete_if{|h1| h1[:tld_extra] && applies_to_names.any?{|h2| !h2[:tld_extra] && h1[:text] == h2[:text]}}
      # Then make sure we're unique
      return applies_to_names.uniq
    end
  end
end