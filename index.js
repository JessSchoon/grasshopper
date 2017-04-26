var express = require("express")
var application = express()

application.get( "/", function (request, response) {
  response.send("Hi!")
})

application.listen(1436)
