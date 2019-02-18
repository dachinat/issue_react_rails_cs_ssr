class AddDelaySecToMailboxes < ActiveRecord::Migration[5.2]
  def change
    add_column :mailboxes, :delay_sec, :integer, null: true, default: nil
  end
end
