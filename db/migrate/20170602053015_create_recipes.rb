class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :ingredients, array: true
      t.text :directions, array: true

      t.timestamps
    end
  end
end
