# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  include ApplicationHelper

  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  User::OMNIAUTH_PROVIDERS.each do |provider|
    define_method provider do
      auth = request.env["omniauth.auth"]

      (render_or_redirect_with_no_email && return) unless auth.info.email

      @user = UserProvider.send("find_for_#{provider}_oauth", auth)

      if @user.persisted?
        sign_in @user, event: :authentication, store: false
        @jwt_token = "Bearer #{request.headers["warden-jwt_auth.token"]}"
      end
      render_or_redirect
    end
  end

  # More info at:
  # https://github.com/plataformatec/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end

  private

    def render_or_redirect
      if request.env["omniauth.params"]["popup"]
        if @jwt_token
          render_js do
            <<-JS
            window.opener.postMessage({omniauthJWT: '#{@jwt_token}'}, '*');
            window.close();
          JS
          end
        else
          render_js do
            <<-JS
            window.opener.postMessage({omniauthFailure: true}, '*');
            window.close();
          JS
          end
        end
      else
        # Not implemented on client side (currently using only pop-up)
        if @jwt_token
          redirect_to client_base + "/auth/login?jwt_token=" + @jwt_token
        else
          redirect_to client_base + "/auth/register?omniauth_fallback"
        end
      end
    end

    def render_or_redirect_with_no_email
      # This is popup-only
      if request.env["omniauth.params"]["popup"]
        render_js do
          <<-JS
            window.opener.postMessage({omniauthFailure: true, reason: 'email'}, '*');
            window.close();
          JS
        end
      end
    end
end
