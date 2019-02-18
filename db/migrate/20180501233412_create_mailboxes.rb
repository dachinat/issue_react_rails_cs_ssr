class CreateMailboxes < ActiveRecord::Migration[5.2]
  def change
    create_table :mailboxes do |t|
      t.string :name
      t.string :username, index: { unique: true }
      t.string :password
      t.integer :order, default: 0
      t.integer :max_message_size, default: 1048576 # 1 mb

      t.references :user

      t.timestamps
    end

    add_index :mailboxes, :name
  end
end
