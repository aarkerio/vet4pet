class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fname
      t.string :lname
      t.string :uname
      t.string :passwd
      t.boolean :active
      t.references :group, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
