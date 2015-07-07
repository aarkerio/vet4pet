class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.datetime :scheduled_time
      t.references :pet, index: true, foreign_key: true
      t.boolean :reminder
      t.string :reason_for_visit
      t.integer :doctor_id

      t.timestamps null: false
    end
  end
end
