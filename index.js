var db = require('./lib/db')
var express = require('express')
var path = require('path')
var application = express()

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

application.get('/:recipe', function (request, response) {
  var recipeData = db.getRecipeBySlug(request.params.recipe)
  response.render('recipe', recipeData)
})

application.listen(1436, function () {
  console.log('Listening on port 1436...')
})

application.set('view engine', 'pug')
application.set('views', './templates')
