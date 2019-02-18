# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.6.0"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 6.0.0.beta1"
# Use postgresql as the database for Active Record
gem "pg", ">= 0.18", "< 2.0"
# Use Puma as the app server
gem "puma", "~> 3.11"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem "webpacker", ">= 4.0.0.rc.7"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.5"
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

gem "figaro"
gem "react-rails"
gem "mini_racer"
gem "active_model_serializers"
gem "mengpaneel", github: "ocha/mengpaneel"
gem "devise"
gem "omniauth-github"
gem "omniauth-google-oauth2"
gem "omniauth-atlassian-bitbucket"
gem "devise-jwt", "~> 0.5.6"
gem "bugsnag"
gem "skylight"
gem "responders"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"

  # Extras
  gem "bundler-audit"
  gem "brakeman", require: false
  gem "rubocop", require: false
  gem "rubocop-rails_config"

  gem "letter_opener"
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
