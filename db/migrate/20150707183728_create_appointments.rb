class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.datetime :date
      t.references :pet, index: true, foreign_key: true
      t.boolean :reminder
      t.string :reason
      t.integer :doctor_id
      t.integer :owner_id
      t.boolean :active

      t.timestamps null: false
    end
  end
end
