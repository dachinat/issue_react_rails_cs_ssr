class AddSharedUntilToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :shared_until, :datetime
  end
end
