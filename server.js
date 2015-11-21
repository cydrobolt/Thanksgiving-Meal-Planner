var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var ejs = require("ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static('static'));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
	res.render("index.ejs");
});

app.get("/recipes", function(req,res){
	res.render("recipes.ejs");
});

app.get("/events", function(req,res){
	res.render("events.ejs");
});

app.get("/createevent", function(req,res){
	res.render("createEvent.ejs");
});

app.get("/editrecipe", function(req,res){
	res.render("editRecipe.ejs");
});

app.get("/eventList", function(req, res){
	var eventsObject = fs.readFileSync("data/events.json");
	res.send(eventsObject);
});

app.post("/eventList", function(req, res){
	var eventsObject = JSON.parse(fs.readFileSync("data/events.json", "utf8"));
	eventsObject.push(req.body);
	fs.writeFileSync("data/events.json", JSON.stringify(eventsObject));
	res.send("done");
});

app.listen(process.env.PORT || 4000);