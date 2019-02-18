class RemoveSharedUntilFromMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :shared_until
  end
end
