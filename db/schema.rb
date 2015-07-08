# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150707183728) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.datetime "scheduled_time"
    t.integer  "pet_id"
    t.boolean  "reminder"
    t.string   "reason_for_visit"
    t.integer  "doctor_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "appointments", ["pet_id"], name: "index_appointments_on_pet_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "images", force: :cascade do |t|
    t.string   "file"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "images", ["user_id"], name: "index_images_on_user_id", using: :btree

  create_table "kinds", force: :cascade do |t|
    t.string   "name"
    t.integer  "image_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "kinds", ["image_id"], name: "index_kinds_on_image_id", using: :btree

  create_table "pets", force: :cascade do |t|
    t.string   "name"
    t.integer  "age"
    t.integer  "image_id"
    t.integer  "kind_id"
    t.boolean  "interned"
    t.datetime "created"
    t.string   "tags"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "pets", ["image_id"], name: "index_pets_on_image_id", using: :btree
  add_index "pets", ["kind_id"], name: "index_pets_on_kind_id", using: :btree
  add_index "pets", ["user_id"], name: "index_pets_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "fname"
    t.string   "lname"
    t.string   "uname"
    t.string   "passwd"
    t.boolean  "active"
    t.integer  "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "users", ["group_id"], name: "index_users_on_group_id", using: :btree

  add_foreign_key "appointments", "pets"
  add_foreign_key "images", "users"
  add_foreign_key "kinds", "images"
  add_foreign_key "pets", "images"
  add_foreign_key "pets", "kinds"
  add_foreign_key "pets", "users"
  add_foreign_key "users", "groups"
end
