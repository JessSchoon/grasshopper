var express = require("express")
var path = require("path")
var application = express()

application.get("/", function (request, response){
  response.send("Hi! Welcome!!")
})

application.get( "/bootstrap.js", function (request, response) {
  var jsPath = path.join(__dirname, "node_modules", "bootstrap", "dist", "js", "bootstrap.js")
  response.sendFile(jsPath)
})

application.get( "/bootstrap.css", function (request, response) {
  var cssPath = path.join(__dirname, "node_modules", "bootstrap", "dist", "css", "bootstrap.css")
  response.sendFile(cssPath)
})

application.get("/styles.css", function(request, response) {
  var cssPath = path.join(__dirname, "assets", "styles.css")
  response.sendFile(cssPath)
})

application.get( "/:recipe", function (request, response) {
  response.render("index", {recipe: request.param("recipe")})
})

application.listen(1436)

application.set('view engine', 'pug')
application.set('views', './views')
