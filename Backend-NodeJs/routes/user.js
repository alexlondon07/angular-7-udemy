'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/test-controller', UserController.test);
api.post('/register-user', UserController.saveUser);
api.post('/login-user', UserController.login);

module.exports = api;