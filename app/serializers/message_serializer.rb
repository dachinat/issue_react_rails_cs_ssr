# frozen_string_literal: true

class MessageSerializer < ActiveModel::Serializer
  attributes *(Message.column_names)
  has_one :message_share
end
