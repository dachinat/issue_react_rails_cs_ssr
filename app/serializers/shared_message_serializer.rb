# frozen_string_literal: true

class SharedMessageSerializer < ActiveModel::Serializer
  attributes *(Message.column_names + ["user_display"])

  has_one :message_share

  def user_display
    object.mailbox.user.email
  end
end
