var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require("ejs");
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var http = require('https');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
var request = require('request');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({ secret: 'hacktrin' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static('static'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("connected!");
});

app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {title: 'login', message: req.flash('loginMessage')}); 
});

app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', {title: 'signup', message: req.flash('signupMessage')});
});


app.get('/myaccount', isLoggedIn, function(req, res) {
	res.render('myaccount.ejs', {title: 'myaccount', user : req.user});
});

app.get('/logout', function (req, res){
	req.logout();
	req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
});
});

app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/myaccount', // redirect to the secure myaccount section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/myaccount', // redirect to the secure myaccount section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect : '/myaccount',
		failureRedirect : '/'
	}));


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
    	return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


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

app.get("/viewrecipe/:id", function(req,res){
	var temp = JSON.parse(req.params.id);
	res.render("viewRecipe.ejs", {title: "viewRecipe", recipe: temp});
});

app.get("/editrecipe", function(req,res){
	res.render("editRecipe.ejs", {title: "editRecipe"});
});

app.get("/testimportrecipe", function(req,res){
var http = require("http");
    url = "http://food2fork.com/api/get?key=a809f49e42a99449eeaf0333684d1ecc&rId=13218";

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
        data,
        route;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        console.log(buffer);
        console.log("\n");
        data = JSON.parse(buffer);
        console.log(data);
        res.render('testimport.ejs', {title: "testimport", returnedJSON: data});
    }); 
}); 
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

app.get("/recipeList", function(req, res){
	var recipesObject = fs.readFileSync("data/recipes.json");
	res.send(recipesObject);
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

app.get("/viewARecipe", function(req, res){
	var temp = req.body;
	res.render("viewRecipe.ejs", {recipe: temp, title: temp.name});
});

app.listen(process.env.PORT || 4000);