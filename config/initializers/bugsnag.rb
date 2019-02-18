Bugsnag.configure do |config|
  config.api_key = Figaro.env.bugsnag_rails_token
end
