'use strict'

//Modules
var fs = require('fs');
var path = require('path');

//Models
var User = require('../models/user');
var Animal = require('../models/animal');

//Constants
var ANIMAL_CONSTANTS = {
    upload_animal: './uploads/animals/'
}

//Actions
function testAnimal(req, res){
    res.status(200).send({
        message: 'test Animal',
        user: req.user
    });
}

module.exports = {
    testAnimal,
    ANIMAL_CONSTANTS
}