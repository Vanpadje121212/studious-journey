atom_feed(:root_url => current_path_with_params(host: request.host)) do |feed|
	feed.title(@title)
	feed.subtitle(@description)
	feed.updated(@scripts[0].code_updated_at) if @scripts.length > 0

	@scripts.each do |script|
		feed.entry(script, :updated => script.code_updated_at) do |entry|
			entry.title(script.name)
			entry.content("<p>#{h(script.description)}</p>".html_safe + format_user_text(script.additional_info, script.additional_info_markup), type: 'html')
			if script.license.nil?
				if !script.license_text.nil?
					entry.rights(script.license_text, type: 'text')
				end
			else
				entry.rights(script.license.name, type: 'text')
			end

			entry.author do |author|
        if script.users.count == 1
          author.name(script.users.first.name)
          author.uri(user_url(script.users.first))
        else
          author.name(script.users.map(&:name).to_sentence)
        end
			end
		end
	end
end
