var express = require("express")
var application = express()

application.get( "/:recipe", function (request, response) {
  response.render("index", {recipe: request.param("recipe")})
})

application.listen(1436)

application.set('view engine', 'pug')
application.set('views', './views')
