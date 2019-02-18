# frozen_string_literal: true
require "application_responder"

class ApplicationController < ActionController::Base
  include Mengpaneel::Controller

  # Prepare devise for json responses
  before_action lambda {
    self.class.class_eval do
      responder = ApplicationResponder
      clear_respond_to
      respond_to :json
      prepend_before_action Proc.new {request.format = :json}
    end if is_a? ::DeviseController
  }

  before_action :setup_mixpanel
  before_action :disable_omniauth_sessions
  after_action :disable_omniauth_sessions
  after_action :track_mixpanel

  # TODO: Remove this
  skip_forgery_protection

  def setup_mixpanel
    mengpaneel.flushing_strategy = Mengpaneel::Strategy::AsyncServerSide

    return unless user_signed_in?

    mengpaneel.setup do
      mixpanel.identify(current_user.id)

      mixpanel.people.set(
        "ID"              => current_user.id,
        "$email"          => current_user.email,
        "$created"        => current_user.created_at,
        "$last_login"     => current_user.current_sign_in_at
      )
    end
  end

  def track_mixpanel
    mixpanel.track("#{controller_name}##{action_name}")
  end

  def disable_omniauth_sessions
    #request.session_options[:skip] = true unless controller_name == "omniauth_callbacks"
    #session.clear
  end
end
