'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var middleware_auth = require('../middlewares/autenticate');

var userUploadDir = './uploads/users';

var multipart = require('connect-multiparty');
var middleware_upload = multipart( { uploadDir: userUploadDir });

api.post('/login', UserController.login);
api.post('/register-user', UserController.saveUser);

api.get('/test-controller', middleware_auth.ensureAuth, UserController.test);
api.put('/update-user/:id', middleware_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [middleware_auth.ensureAuth, middleware_upload], UserController.uploadImage);

module.exports = api;