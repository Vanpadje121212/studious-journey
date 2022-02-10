class Locale < ApplicationRecord
  has_many :scripts, dependent: :restrict_with_exception
  has_many :locale_contributors, dependent: :destroy

  scope :with_listable_scripts, ->(script_subset) { joins(:scripts).where(scripts: Script.listable(script_subset).where_values_hash).distinct.order(:code) }

  def self.english
    Locale.find_by!(code: 'en')
  end

  def display_text
    "#{best_name} (#{code})"
  end

  def best_name
    native_name || english_name
  end

  # Returns the matching locales for the passed locale code, with locales with UI available first.
  def self.matching_locales(locale_code)
    locale_codes_to_look_up = [locale_code]
    if locale_code.include?('-')
      language_part_only = locale_code.split('-').first
      locale_codes_to_look_up << language_part_only if language_part_only
    else
      language_part_only = locale_code
    end

    # The dashed one is last alphabetically but first in our hearts.
    locales = where(code: locale_codes_to_look_up).order(ui_available: :asc, code: :desc).load
    return locales if locales.any?

    return where('code like ?', "#{language_part_only}-%").order(:ui_available, :code)
  end

  def scripts?(script_subset)
    Rails.cache.fetch("locale_has_scripts/#{code}/#{script_subset}") do
      Script.listable(script_subset).joins(:localized_attributes).where(locale_id: id).any?
    end
  end

  def self.with_discussions
    locale_ids = Rails.cache.fetch('locale_with_discussions') do
      Discussion.visible.distinct.pluck(:locale_id)
    end
    where(id: locale_ids)
  end
end
