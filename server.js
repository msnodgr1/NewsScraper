var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');
var expshbs = require('express-handlebars');
var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false}));

app.engine('handlebars', expshbs({defaultLayout: "main"}));

app.set("view engine", "handlebars");

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/db_news', {
	useMongoClient: true
});

var routes = require('./routes/controller.js');

app.use("/", routes);

app.use("/scrape", routes);

app.use("/saved", routes);

app.use("/comment", routes);

app.use("/delete", routes);



app.listen(PORT, function(){
	console.log("Listening on port ", PORT)
})