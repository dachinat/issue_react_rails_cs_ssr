class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages, id: :string do |t|
      t.json :attachments
      t.datetime :date
      t.json :envelope
      t.json :from
      t.json :headers
      t.string :messageId
      t.string :priority
      t.boolean :read
      t.string :source
      t.string :subject
      t.string :text
      t.string :html
      t.datetime :time
      t.json :to
      t.integer :order, default: 0

      t.references :mailbox

      t.timestamps
    end

    add_index :messages, :subject
  end
end
