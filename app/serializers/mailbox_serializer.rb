# frozen_string_literal: true

class MailboxSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :password, :error_rate, :delay_sec, :order
end
