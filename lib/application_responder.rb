# frozen_string_literal: true

class ApplicationResponder < ActionController::Responder
  include Responders::FlashResponder
  include Responders::HttpCacheResponder

  # Redirects resources to the collection path (index action) instead
  # of the resource path (show action) for POST/PUT/DELETE requests.
  # include Responders::CollectionResponder

  protected

    # To adjust validation errors coming from devise (for instance, during a sign up)
    # https://github.com/waiting-for-dev/devise-jwt/wiki/Configuring-devise-for-APIs
    def json_resource_errors
      {
          error: true,
          errors: resource.errors,
      }
    end

    def api_behavior
      if post?
        display resource, status: :created
      elsif put?
        display resource, status: :ok
      elsif delete?
        display resource, status: :ok
      else
        super
      end
    end
end
