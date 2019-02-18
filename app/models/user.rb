# frozen_string_literal: true

class User < ApplicationRecord
  # Constants
  OMNIAUTH_PROVIDERS = Devise.omniauth_providers

  # Includes
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :confirmable, :lockable, :recoverable, :trackable, :validatable,
    :omniauthable, :jwt_authenticatable, omniauth_providers: OMNIAUTH_PROVIDERS, jwt_revocation_strategy: self

  # Serialization

  # Associations
  has_many :user_provider, dependent: :destroy
  has_many :mailboxes
  has_many :messages, through: :mailboxes

  # Delegations

  # Callbacks

  # Validations

  # Named Scopes

  # Class Methods

  # Instance Methods
  def password_secured
    encrypted_password.present?
  end
end
