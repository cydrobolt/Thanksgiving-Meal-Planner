var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require("ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static('static'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/test');

app.get("/", function(req,res){
	res.render("index.ejs", {title: "home"});
});

app.get("/recipes", function(req,res){
	res.render("recipes.ejs", {title: "recipes"});
});

app.get("/events", function(req,res){
	res.render("events.ejs", {title: "events"});
});

app.get("/createevent", function(req,res){
	res.render("createEvent.ejs", {title: "createEvent"});
});

app.get("/editrecipe", function(req,res){
	res.render("editRecipe.ejs", {title: "editRecipe"});
});

app.get("/myaccount", function(req,res){
	res.render("myaccount.ejs", {title: "myaccount"});
});

app.get("/dashboard", function(req,res){
	res.render("dashboard.ejs", {title: "dashboard"});
});

app.get("/eventList", function(req, res){
	var eventsObject = fs.readFileSync("data/events.json");
	res.send(eventsObject);
});

app.post("/eventList", function(req, res){
	var eventsObject = JSON.parse(fs.readFileSync("data/events.json"));
	eventsObject.push(req.body);
	fs.writeFileSync("data/events.json", JSON.stringify(eventsObject));
	res.send("done");
});

app.post("/recipeList", function(req, res){
	var recipesObject = JSON.parse(fs.readFileSync("data/recipes.json"));
	recipesObject.push(req.body);
	console.log(req.body);
	fs.writeFileSync("data/recipes.json", JSON.stringify(recipesObject));
	res.send("done");
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connected!");
});

app.listen(process.env.PORT || 4000);