class CreateKinds < ActiveRecord::Migration[5.0]
  def change
    create_table :kinds do |t|
      t.string :name
      t.references :image, foreign_key: true

      t.timestamps
    end
  end
end
