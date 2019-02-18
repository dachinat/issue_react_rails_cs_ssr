# frozen_string_literal: true

class Mailbox < ApplicationRecord
  # Constants

  # Includes

  # Serialization

  # Associations
  belongs_to :user
  has_many :messages

  # Delegations

  # Callbacks
  before_create :increase_order
  before_validation :generate_credentials, on: :create

  # Validations
  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :username, presence: true, uniqueness: true

  # Named Scopes

  # Class Methods

  # Instance Methods

  def generate_credentials
    self.username = SecureRandom.alphanumeric(12)
    self.password = SecureRandom.urlsafe_base64(12)
  end

  private

    def increase_order
      self.order = (self.user.mailboxes.maximum(:order) || 0) + 1
    end
end
