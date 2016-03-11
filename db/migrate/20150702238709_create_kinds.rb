class CreateKinds < ActiveRecord::Migration
  def change
    create_table :kinds do |t|
      t.string :name
      t.references :image, foreign_key: true

      t.timestamps
    end
  end
end
