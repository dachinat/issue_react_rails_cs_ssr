# frozen_string_literal: true

class Message < ApplicationRecord
  # Constants

  # Includes

  # Serialization

  # Associations
  has_one :message_share
  belongs_to :mailbox

  # Delegations

  # Callbacks
  before_create :increase_order

  # Validations

  # Named Scopes

  # Class Methods
  def self.update_orders(orders)
    orders.each_with_index { |id, index| find(id).update_attributes(order: (index + 1)) }
  end

  def self.read_all
    all.update_all(read: true)
  end

  # Instance Methods
  private

    def increase_order
      self.order = (self.mailbox.messages.maximum(:order) || 0) + 1
    end
end
