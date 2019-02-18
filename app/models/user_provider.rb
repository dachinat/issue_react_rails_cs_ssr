# frozen_string_literal: true

class UserProvider < ApplicationRecord
  # Constants

  # Includes

  # Serialization

  # Associations
  belongs_to :user

  # Delegations

  # Callbacks

  # Validations

  # Named Scopes

  # Class Methods
  User::OMNIAUTH_PROVIDERS.each do |provider|
    define_singleton_method "find_for_#{provider}_oauth" do |auth|
      provider = UserProvider.find_by(provider: auth.provider, uid: auth.uid)

      if provider
        user = provider.user
      else
        user = User.find_by(email: auth.info.email)

        unless user
          user = User.new(email: auth.info.email)
          user.skip_confirmation!
          user.save!(validate: false)
        end

        UserProvider.create!(provider: auth.provider, uid: auth.uid, user_id: user.id)
      end
      user.update_attributes(current_provider: auth.provider)
      user
    end
  end

  # Instance Methods
end
