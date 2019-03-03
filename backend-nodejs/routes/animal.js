'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var middleware_auth = require('../middlewares/autenticate');

var multipart = require('connect-multiparty');
var middleware_upload = multipart( { uploadDir: AnimalController.ANIMAL_CONSTANTS.upload_animal });

api.get('/test-controller-animal', middleware_auth.ensureAuth, AnimalController.testAnimal);
api.post('/animal', middleware_auth.ensureAuth, AnimalController.saveAnimal);
api.get('/animals', AnimalController.getAnimals);
api.get('/animal/:id', AnimalController.getAnimalById);

module.exports = api;