'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var middleware_auth = require('../middlewares/autenticate');

var multipart = require('connect-multiparty');
var middleware_upload = multipart( { uploadDir: UserController.USER_CONSTANTS.upload_user });

api.post('/login', UserController.login);
api.post('/register-user', UserController.saveUser);

api.get('/test-controller', middleware_auth.ensureAuth, UserController.test);
api.put('/update-user/:id', middleware_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [middleware_auth.ensureAuth, middleware_upload], UserController.uploadImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);
api.get('/keepers', UserController.getKeepers);

module.exports = api;