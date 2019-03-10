'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var middleware_auth = require('../middlewares/autenticate');
var middleware_admin = require('../middlewares/is_admin');

var multipart = require('connect-multiparty');
var middleware_upload = multipart( { uploadDir: AnimalController.ANIMAL_CONSTANTS.upload_animal });

api.get('/test-controller-animal', middleware_auth.ensureAuth, AnimalController.testAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimalById);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);

//Routes with middlewares
api.post('/animal', [middleware_auth.ensureAuth, middleware_admin.isAdmin], AnimalController.saveAnimal);
api.put('/animal/:id',[middleware_auth.ensureAuth, middleware_admin.isAdmin], AnimalController.updateAnimal);
api.delete('/animal/:id',[middleware_auth.ensureAuth, middleware_admin.isAdmin], AnimalController.deleteAnimal);
api.post('/upload-image-animal/:id',[middleware_auth.ensureAuth, middleware_admin.isAdmin, middleware_upload], AnimalController.uploadImage);

module.exports = api;