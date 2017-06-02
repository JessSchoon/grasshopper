class RecipeSerializer < ActiveModel::Serializer
  attributes :title, :ingredients, :directions
end
