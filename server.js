var express = require("express");
var bodyParser = require("body-parser");

// initialize instance of express.
var app = express();

// set up port using environment variable if exists, else 8080.
var PORT = process.env.PORT || 8080;

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routers
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// begin listening for user requests, start the server.
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});