# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes *(User.column_names - ["encrypted_password"] + ["password_secured"])
  has_many :user_provider
end
