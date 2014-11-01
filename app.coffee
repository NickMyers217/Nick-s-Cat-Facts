express = require "express"
path = require "path"
logger = require "morgan"
bodyParser = require "body-parser"
request = require "request"
app = express()

# set up app
app.set "views", path.join(__dirname, "views")
app.set "view engine", "ejs"

# set up middleware
app.use logger "dev"
app.use express.static path.join(__dirname, "public")
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: false)

# routes

# GET home page. 
app.get "/", (req, res) ->
	# API call for a cat fact takes a number of facts to return up to 100
	request "http://catfacts-api.appspot.com/api/facts?number=1", (error, response, body) ->
		if !error and response.statusCode == 200
			console.log body
			res.render "index",
				title: "Learn About Cats!",
				facts: JSON.parse(body).facts[0]

# start the server
app.set "port", process.env.PORT or 1337
server = app.listen app.get("port"), ->
  console.log "Express server listening on port " + server.address().port
