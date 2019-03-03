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

//Base routes
app.use('/api', user_routes);
app.use('/api', animal_routes);

module.exports = app;
