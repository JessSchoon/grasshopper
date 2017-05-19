var db = require('./lib/db')
var bodyparser = require('body-parser')
var express = require('express')
var morgan = require('morgan')
var path = require('path')
var string = require('underscore.string')
var application = express()

application.use(morgan('dev'))
application.use(bodyparser.urlencoded())

application.get('/', function (request, response) {
  var recipes = db.getAllRecipes()
  response.render('index', { recipes: recipes })
})

application.get('/bootstrap.js', function (request, response) {
  var jsPath = path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.js')
  response.sendFile(jsPath)
})

application.get('/bootstrap.css', function (request, response) {
  var cssPath = path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.css')
  response.sendFile(cssPath)
})

application.get('/styles.css', function (request, response) {
  var cssPath = path.join(__dirname, 'assets', 'styles.css')
  response.sendFile(cssPath)
})

application.get('/recipes/new', function (request, response) {
  response.render('new-recipe')
})

function deLiner (original) {
  return original.replace(/\r\n/g, '\n').split('\n').filter(function (line) {
    return line.length > 0
  })
}

application.post('/recipes', function (request, response) {
  var newRecipeData = {
    title: request.body.title,
    slug: string.slugify(request.body.title),
    ingredients: deLiner(request.body.ingredients),
    directions: deLiner(request.body.directions)
  }

  db.addNewRecipe(newRecipeData)

  response.redirect('/')
})

application.get('/recipes/:recipeSlug', function (request, response) {
  var recipeData = db.getRecipeBySlug(request.params.recipeSlug)
  if (recipeData == null) {
    response.status(404).render('404')
    return
  }
  response.render('recipe', recipeData)
})

application.get('/recipes/:recipeSlug/remove', function (request, response) {
  db.removeRecipe(request.params.recipeSlug)
  response.redirect('/')
})

application.listen(1436, function () {
  console.log('Listening on port 1436...')
})

application.set('view engine', 'pug')
application.set('views', './templates')
