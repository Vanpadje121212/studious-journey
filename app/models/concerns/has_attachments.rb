require 'active_support/concern'

module HasAttachments
  extend ActiveSupport::Concern

  ALLOWED_CONTENT_TYPES = %w[image/png image/jpg image/jpeg image/gif image/apng image/webp].freeze

  included do
    has_many_attached :attachments

    validates :attachments,
              content_type: ALLOWED_CONTENT_TYPES,
              size: { less_than: Rails.configuration.screenshot_max_size },
              limit: { max: Rails.configuration.screenshot_max_count }
  end
end
