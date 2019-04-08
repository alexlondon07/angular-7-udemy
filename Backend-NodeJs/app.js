'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Routers Loading
var user_routes = require('./routes/user');
var animal_routes = require('./routes/animal');

//Middlewares the body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Config Headers and Cors 
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

//Base routes
app.use('/api', user_routes);
app.use('/api', animal_routes);

module.exports = app;
