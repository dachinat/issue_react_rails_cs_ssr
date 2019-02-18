Mengpaneel.configure do |config|
  config.token = Figaro.env.mixpanel_token
end
