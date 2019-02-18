# frozen_string_literal: true

class JWTParam
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)
    authorization = request.params["authorization"]
    if authorization
      env["HTTP_AUTHORIZATION"] = "Bearer #{request.params["authorization"]}"
    end
    @app.call(env)
  end
end
