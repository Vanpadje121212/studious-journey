class LocalizedScriptAttribute < ApplicationRecord
  include MentionsUsers

  belongs_to :script
  belongs_to :locale

  strip_attributes only: [:attribute_key, :attribute_value]

  validates :attribute_key, :attribute_value, :locale, :value_markup, presence: true

  validates :sync_identifier, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), message: :script_sync_identifier_bad_protocol, if: proc { |r| r.sync_source_id == 1 } }

  def localized_meta_key
    return LocalizedScriptAttribute.localized_meta_key(attribute_key, locale, attribute_default)
  end

  def self.localized_meta_key(attr, locale, attribute_default)
    return "@#{attr}#{(attribute_default || locale.nil?) ? '' : ":#{locale.code}"}"
  end
end
