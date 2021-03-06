// Generated by CoffeeScript 1.8.0
(function() {
  var app, bodyParser, express, logger, path, request, server;

  express = require("express");

  path = require("path");

  logger = require("morgan");

  bodyParser = require("body-parser");

  request = require("request");

  app = express();

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "ejs");

  app.use(logger("dev"));

  app.use(express["static"](path.join(__dirname, "public")));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.get("/", function(req, res) {
    return request("http://catfacts-api.appspot.com/api/facts?number=1", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        return res.render("index", {
          title: "Learn About Cats!",
          facts: JSON.parse(body).facts[0]
        });
      }
    });
  });

  app.set("port", process.env.PORT || 1337);

  server = app.listen(app.get("port"), function() {
    return console.log("Express server listening on port " + server.address().port);
  });

}).call(this);
