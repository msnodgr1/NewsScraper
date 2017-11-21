//routes for entire app
var express = require('express');
var router = express.Router();
var axios = require('axios');
var cheerio = require("cheerio");
var db = require('../models/models.js');



//default route
router.get("/", function(req, res){
	res.render("index");
})



//scraping cleveland.com for news
router.get("/scrape", function(req, res){

	axios.get("http://www.cleveland.com/news/").then(function(response){

		var $ = cheerio.load(response.data);

		$("article h2").each(function(i, element){

			var result = {};

			result.title = $(this)
				.children("a")
				.text();
			result.link = $(this)
				.children("a")
				.attr("href");

			db.Article
				.create(result)
				.then(function(dbArticle){
					console.log('sent');
				})
				.catch(function(err){
					res.json(err);
				});
		});
	});

});

//getting all the stories from the db
router.get("/articles", function(req, res){
	db.Article
	.find({})
	.then(function(dbArticle){
		res.json(dbArticle);
		res.render("index");
	})
	.catch(function(err){
		res.json(error);
	})
});


//getting article by id to pair with comment
router.get("/articles/:id", function(req, res){
	db.Article
	.findOne({_id: req.params.id})
	.populate("comment")
	.then(function(dbArticle){
		res.json(dbArticle);
	})
	.catch(function(err){
		res.json(err);
	});
});


//save/update comment on article
router.post("/articles/:id", function(req, res){
	db.comment
	.create(req.body)
	.then(function(dbComment){
		return db.Article.findOneAndUpdate({_id: req.params.id}, {comment: dbComment._id}, {new: true});
	})
	.then(function(dbArticle){
		res.json(dbArticle);
	})
	.catch(function(err){
		res.json(err);
	})
})



module.exports = router;
//app.get("articles")