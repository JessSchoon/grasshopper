var fs = require('fs')
var path = require('path')
var RECIPES = require('../recipes.json')

function addNewRecipe (recipe) {
  RECIPES[recipe.slug] = recipe
  delete RECIPES[recipe.slug].slug

  fs.writeFileSync(path.join(__dirname, '..', 'recipes.json'), JSON.stringify(RECIPES, null, 2))
}

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
  addNewRecipe,
  getAllRecipes,
  getRecipeBySlug
}
