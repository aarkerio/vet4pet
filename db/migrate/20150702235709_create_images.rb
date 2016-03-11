class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :file
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
