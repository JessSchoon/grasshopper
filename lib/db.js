var RECIPES = require('../recipes.json')

function getAllRecipes () {
  return Object.keys(RECIPES).map(key => {
    return getRecipeBySlug(key)
  })
}

function getRecipeBySlug (slug) {
  var recipe = RECIPES[slug]

  if (!recipe) {
    return null
  }

  recipe.slug = slug
  return recipe
}

module.exports = {
  getAllRecipes,
  getRecipeBySlug
}
