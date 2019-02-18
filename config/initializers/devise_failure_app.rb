class FailureApp < Devise::FailureApp
  # Render with our own errors format standard
  # https://github.com/waiting-for-dev/devise-jwt/wiki/Configuring-devise-for-APIs
  def http_auth_body
    return super unless request_format == :json
    {
        error: true,
        message: i18n_message
    }.to_json
  end
end
