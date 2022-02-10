# Don't replace tabs
CodeRay::Encoders::HTML.module_eval do
	alias_method :original_text_token, :text_token
	def text_token text, kind
		@HTML_ESCAPE["\t"] = "\t"
		original_text_token(text, kind)
	end
end
