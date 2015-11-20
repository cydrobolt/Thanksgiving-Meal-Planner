var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser'); 
var ejs = require("ejs");

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static('files'));
app.set('view engine', 'ejs');


app.get("/", function(req,res){



res.render("index.ejs");


});