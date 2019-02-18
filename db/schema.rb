# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_31_170842) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "mailboxes", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password"
    t.integer "order", default: 0
    t.integer "max_message_size", default: 1048576
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "error_rate"
    t.integer "delay_sec"
    t.index ["name"], name: "index_mailboxes_on_name"
    t.index ["user_id"], name: "index_mailboxes_on_user_id"
    t.index ["username"], name: "index_mailboxes_on_username", unique: true
  end

  create_table "message_shares", force: :cascade do |t|
    t.string "token"
    t.datetime "valid_until"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "message_id", null: false
    t.index ["message_id"], name: "index_message_shares_on_message_id", unique: true
    t.index ["token"], name: "index_message_shares_on_token"
  end

  create_table "messages", id: :string, force: :cascade do |t|
    t.json "attachments"
    t.datetime "date"
    t.json "envelope"
    t.json "from"
    t.json "headers"
    t.string "messageId"
    t.string "priority"
    t.boolean "read"
    t.string "source"
    t.string "subject"
    t.string "text"
    t.string "html"
    t.datetime "time"
    t.json "to"
    t.integer "order", default: 0
    t.bigint "mailbox_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mailbox_id"], name: "index_messages_on_mailbox_id"
    t.index ["subject"], name: "index_messages_on_subject"
  end

  create_table "user_providers", force: :cascade do |t|
    t.bigint "user_id"
    t.string "provider"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_providers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.string "current_provider"
    t.boolean "is_admin", default: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.integer "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

end
