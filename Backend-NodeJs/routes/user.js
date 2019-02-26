'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var middleware_auth = require('../middlewares/autenticate');

api.get('/test-controller', middleware_auth.ensureAuth, UserController.test);
api.post('/register-user', UserController.saveUser);
api.put('/update-user/:id', middleware_auth.ensureAuth, UserController.updateUser);
api.post('/login-user', UserController.login);

module.exports = api;