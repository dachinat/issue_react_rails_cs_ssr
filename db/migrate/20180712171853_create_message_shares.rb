class CreateMessageShares < ActiveRecord::Migration[5.2]
  def change
    create_table :message_shares do |t|
      t.string :token
      t.datetime :valid_until
      t.timestamps

      t.string :message_id, null: false, foreign_key: { references: nil }, index: { unique: true }

      t.index :token
    end
  end
end
