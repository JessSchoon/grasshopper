var db = require('./lib/db')
var bodyparser = require('body-parser')
var express = require('express')
var path = require('path')
var string = require('underscore.string')
var application = express()

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

application.get('/new', function (request, response) {
  response.render('new-recipe')
})

application.post('/new', function (request, response) {
  var newRecipeData = {
    title: request.body.title,
    slug: string.slugify(request.body.title),
    ingredients: request.body.ingredients.replace(/\r\n/g, '\n').split('\n')
      .map(function (line) {
        var pieces = line.split(' ')
        return {
          amount: Number(pieces[0]),
          unit: pieces[1],
          name: pieces.slice(2).join(' ')
        }
      }),
    directions: request.body.directions.replace(/\r\n/g, '\n').split('\n')
  }

  db.addNewRecipe(newRecipeData)

  response.redirect('/')
})

application.get('/:recipe', function (request, response) {
  var recipeData = db.getRecipeBySlug(request.params.recipe)
  if (recipeData == null) {
    response.status(404).render('404')
    return
  }
  response.render('recipe', recipeData)
})

application.listen(1436, function () {
  console.log('Listening on port 1436...')
})

application.set('view engine', 'pug')
application.set('views', './templates')
