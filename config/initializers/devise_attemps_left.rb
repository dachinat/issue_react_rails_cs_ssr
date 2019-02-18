module Devise
  module Models
    module Authenticatable
      def unauthenticated_message
        "Invalid email or password. #{Devise::maximum_attempts - self.failed_attempts} attemps left."
      end
    end
  end
end


