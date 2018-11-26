class CreateGifts < ActiveRecord::Migration[5.2]
  def change
    create_table :gifts do |t|
      t.string :name, null: false
      t.references :recipient
      t.boolean :delivered, default: false
      t.timestamps
    end
  end
end
