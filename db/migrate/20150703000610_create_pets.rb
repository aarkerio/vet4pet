class CreatePets < ActiveRecord::Migration
  def change
    create_table :pets do |t|
      t.string :name
      t.integer :age
      t.references :image, index: true, foreign_key: true
      t.references :kind, index: true, foreign_key: true
      t.boolean :interned
      t.timestamp :created
      t.string :tags
      t.boolean  :active
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
