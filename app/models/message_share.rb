# frozen_string_literal: true

class MessageShare < ApplicationRecord
  # Constants

  # Includes

  # Serialization
  has_secure_token :token

  # Associations
  belongs_to :message

  # Delegations

  # Callbacks

  # Validations
  validates :valid_until, presence: true

  # Named Scopes

  # Class Methods

  # Instance Methods
end
