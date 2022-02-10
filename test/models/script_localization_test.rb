require 'test_helper'

class ScriptLocalizationTest < ActiveSupport::TestCase

	test 'simple localization' do
		script = get_valid_script
		sv = ScriptVersion.new
		sv.script = script
		sv.code = <<EOF
// ==UserScript==
// @name		A Test!
// @name:fr		Un test!
// @name:es		Una prueba!
// @name:zh-TW	本地化
// @description		Unit test
// @description:fr	Test d'unit
// @description:es	Unidad de prueba
// @description:zh-TW	本地化測試腳本
// @namespace http://greasyfork.local/users/1
// @version 1.0
// ==/UserScript==
var foo = "bar";
EOF
		sv.localized_attributes.build(attribute_key: 'additional_info', attribute_value: 'Additional info', locale: Locale.find_by(code: :en), attribute_default: true, value_markup: 'text')
		sv.localized_attributes.build(attribute_key: 'additional_info', attribute_value: 'Info additionelle', locale: Locale.find_by(code: :fr), attribute_default: false, value_markup: 'text')
		sv.calculate_all
		script.apply_from_script_version(sv)
		assert script.valid?, script.errors.full_messages.inspect
		assert_equal 'A Test!', script.name
		assert_equal 'Unit test', script.description
		available_locale_codes = script.available_locales.map{|l| l.code}
		assert_equal 4, available_locale_codes.length
		assert available_locale_codes.include?('en')
		assert available_locale_codes.include?('fr')
		assert available_locale_codes.include?('es')
		assert available_locale_codes.include?('zh-TW')
		assert_equal 'Un test!', script.localized_value_for(:name, 'fr')
		assert_equal 'Info additionelle', script.localized_value_for(:additional_info, 'fr')
		assert_equal 'Unidad de prueba', script.localized_value_for(:description, 3)
		assert_equal 'A Test!', script.localized_value_for('name', Locale.find(1))
		assert_equal '本地化測試腳本', script.localized_value_for(:description, 'zh-TW')
		# no japanese, use the default
		assert_equal 'Unit test', script.localized_value_for('description', 'ja')
	end

	test 'missing localized description' do
		script = get_valid_script
		sv = ScriptVersion.new
		sv.script = script
		sv.code = <<EOF
// ==UserScript==
// @name		A Test!
// @name:fr		Un test!
// @description		Unit test
// @namespace http://greasyfork.local/users/1
// @version 1.0
// ==/UserScript==
var foo = "bar";
EOF
		sv.calculate_all
		script.apply_from_script_version(sv)
		assert !script.valid?, script.errors.full_messages.inspect
		assert_equal 1, script.errors.full_messages.length, script.errors.full_messages.inspect
		assert_equal ["can't be blank"], script.errors['@description:fr']
	end

	test 'repeated locale additional info' do
		script = get_valid_script
		sv = ScriptVersion.new
		sv.script = script
		sv.code = <<EOF
// ==UserScript==
// @name		A Test!
// @name:fr		Un test!
// @description		Unit test
// @description:fr	Test d'unit
// @namespace http://greasyfork.local/users/1
// @version 1.0
// ==/UserScript==
var foo = "bar";
EOF
		sv.localized_attributes.build({:attribute_key => 'additional_info', :attribute_value => 'Additional info in French', :attribute_default => false, :locale => Locale.where(:code => 'fr').first, :value_markup => 'html'})
		sv.calculate_all
		assert sv.valid?, sv.errors.full_messages.inspect
		sv.localized_attributes.build({:attribute_key => 'additional_info', :attribute_value => 'Additional info in French', :attribute_default => false, :locale => Locale.where(:code => 'fr').first, :value_markup => 'html'})
		assert !sv.valid?
		assert_equal 1, sv.errors.full_messages.length
		assert sv.errors.full_messages.first.include?('Provide only one')
	end

	test 'additional info locale without name' do
		script = get_valid_script
		sv = ScriptVersion.new
		sv.script = script
		sv.code = <<EOF
// ==UserScript==
// @name		A Test!
// @name:fr		Un test!
// @description		Unit test
// @description:fr	Test d'unit
// @namespace http://greasyfork.local/users/1
// @version 1.0
// ==/UserScript==
var foo = "bar";
EOF
		sv.localized_attributes.build({:attribute_key => 'additional_info', :attribute_value => 'Additional info in Spanish', :attribute_default => false, :locale => Locale.where(:code => 'es').first, :value_markup => 'html'})
		sv.calculate_all
		assert !sv.valid?
		assert_equal 1, sv.errors.full_messages.length
		assert sv.errors.full_messages.first.include?('was specified for the \'es\' locale'), sv.errors.full_messages.first
	end

	test 'additional info locale without name but script locale matches' do
		script = get_valid_script
		script.locale = Locale.where(:code => 'es').first
		sv = ScriptVersion.new
		sv.script = script
		sv.code = <<EOF
// ==UserScript==
// @name		A Test!
// @name:fr		Un test!
// @description		Unit test
// @description:fr	Test d'unit
// @namespace http://greasyfork.local/users/1
// @version 1.0
// ==/UserScript==
var foo = "bar";
EOF
		sv.localized_attributes.build({:attribute_key => 'additional_info', :attribute_value => 'Additional info in Spanish', :attribute_default => false, :locale => Locale.where(:code => 'es').first, :value_markup => 'html'})
		sv.calculate_all
		assert sv.valid?
	end

	test 'changing the default locale' do
		script = Script.new(user: User.find(1), locale: Locale.find_by(code: :en))
		sv = ScriptVersion.new
		sv.script = script
		sv.code = <<EOF
// ==UserScript==
// @name		Una prueba!
// @name:fr		Un test!
// @description		Unidad de prueba
// @description:fr	Test d'unit
// @namespace http://greasyfork.local/users/1
// @version 1.0
// ==/UserScript==
var foo = "bar";
EOF
		sv.localized_attributes.build(attribute_key: 'additional_info', attribute_value: 'Additional info en espanol', locale: Locale.find_by(code: :en), attribute_default: true, value_markup: 'text')
		sv.localized_attributes.build(attribute_key: 'additional_info', attribute_value: 'Additional info en francais', locale: Locale.find_by(code: :fr), attribute_default: false, value_markup: 'text')
		sv.calculate_all
		script.apply_from_script_version(sv)
		script.script_versions << sv
		sv.save!
		script.save!

		available_locale_codes = script.available_locales.map{|l| l.code}
		assert_equal available_locale_codes, ['en', 'fr']

		assert_equal 'Una prueba!', script.localized_value_for(:name, 'en')
		assert_equal 'Un test!', script.localized_value_for(:name, 'fr')
		assert_equal 'Unidad de prueba', script.localized_value_for(:description, 'en')
		assert_equal 'Test d\'unit', script.localized_value_for(:description, 'fr')
		assert_equal 'Additional info en espanol', script.localized_value_for(:additional_info, 'en')
		assert_equal 'Additional info en francais', script.localized_value_for(:additional_info, 'fr')

		script.locale = Locale.find_by(code: 'es')
		script.save!

		available_locale_codes = script.available_locales.map{|l| l.code}
		assert_equal available_locale_codes, ['es', 'fr']

		assert_equal 'Una prueba!', script.localized_value_for(:name, 'es')
		assert_equal 'Un test!', script.localized_value_for(:name, 'fr')
		assert_equal 'Unidad de prueba', script.localized_value_for(:description, 'es')
		assert_equal 'Test d\'unit', script.localized_value_for(:description, 'fr')
		assert_equal 'Additional info en espanol', script.localized_value_for(:additional_info, 'es')
		assert_equal 'Additional info en francais', script.localized_value_for(:additional_info, 'fr')
	end

	test 'detecting default locale' do

		script = Script.new(user: User.find(1))
		sv = ScriptVersion.new
		sv.script = script
		sv.code = <<EOF
// ==UserScript==
// @name		Una prueba!
// @name:fr		Un test!
// @description		Unidad de prueba
// @description:fr	Test d'unit
// @namespace http://greasyfork.local/users/1
// @version 1.0
// ==/UserScript==
var foo = "bar";
EOF
		sv.localized_attributes.build(attribute_key: 'additional_info', attribute_value: 'en espanol', attribute_default: true, value_markup: 'text')
		sv.localized_attributes.build(attribute_key: 'additional_info', attribute_value: 'en francais', locale: Locale.find_by(code: :fr), attribute_default: false, value_markup: 'text')
		sv.calculate_all
		script.apply_from_script_version(sv)
		script.script_versions << sv

		Greasyfork::Application.config.enable_detect_locale = true
		DetectLanguage.stub(:simple_detect, 'es') do
			script.valid?
			sv.valid?
			sv.save!
			script.save!
		end

		assert_equal 'es', script.locale.code
		available_locale_codes = script.available_locales.map{|l| l.code}
		assert_equal available_locale_codes, ['es', 'fr']
	end
end
