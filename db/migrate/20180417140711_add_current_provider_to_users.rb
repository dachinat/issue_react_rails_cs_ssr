class AddCurrentProviderToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :current_provider, :string
  end
end
