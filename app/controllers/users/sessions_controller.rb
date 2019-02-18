# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  prepend_before_action :set_current_provider, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super do |resource|
      resource.update_attributes(current_provider: @current_provider)
      Rails.logger.info "kasmdlkamsdlkamdslaksmdalksmdalksdmlas"
      Rails.logger.info resource.inspect
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  def current
    respond_with current_user
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
  #
  def set_current_provider
    @current_provider = current_user.try(:current_provider) || nil
  end
end
