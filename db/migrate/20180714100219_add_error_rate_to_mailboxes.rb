class AddErrorRateToMailboxes < ActiveRecord::Migration[5.2]
  def change
    add_column :mailboxes, :error_rate, :integer, null: true, default: nil
  end
end
