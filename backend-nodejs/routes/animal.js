'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var middleware_auth = require('../middlewares/autenticate');

var multipart = require('connect-multiparty');
var middleware_upload = multipart( { uploadDir: AnimalController.ANIMAL_CONSTANTS.upload_animal });

api.get('/test-controller-animal', middleware_auth.ensureAuth, AnimalController.testAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimalById);
api.post('/animal', middleware_auth.ensureAuth, AnimalController.saveAnimal);
api.put('/animal/:id', middleware_auth.ensureAuth, AnimalController.updateAnimal);
api.delete('/animal/:id', middleware_auth.ensureAuth, AnimalController.deleteAnimal);
api.post('/upload-image-animal/:id', [middleware_auth.ensureAuth, middleware_upload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);

module.exports = api;