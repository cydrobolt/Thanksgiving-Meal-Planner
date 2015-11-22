var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var ejs = require("ejs");
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');


/*mongoose.connect(configDB.url);*/mongoose.connect('mongodb://localhost/test');
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
 require('./config/passport')(passport); // pass passport for configuration




















app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static('static'));
app.set('view engine', 'ejs');






 app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });



 app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

 app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

     app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));




function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


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