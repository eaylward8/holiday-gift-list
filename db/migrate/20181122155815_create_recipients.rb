class CreateRecipients < ActiveRecord::Migration[5.2]
  def change
    create_table :recipients do |t|
      t.string :first_name
      t.string :last_name
      t.integer :age
      t.string :city
      t.string :country
      t.boolean :nice
      t.timestamps
    end
  end
end
