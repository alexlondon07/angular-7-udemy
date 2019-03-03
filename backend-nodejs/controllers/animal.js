'use strict'

//Modules
var fs = require('fs');
var path = require('path');

//Models
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

/**
 * Method Animal Save
 * @param {*} req 
 * @param {*} res 
 */
function saveAnimal(req, res){
    var animal = new Animal(); 
    var params = req.body;
    if( params.name != "" ){
        animal.name = params.name;
        animal.description = params.description,
        animal.year = params.year,
        animal.image = null,
        animal.user = req.user.sub;
        animal.save(( err, animalStored)=>{
            if(err){
                res.status(500).send({ message: 'Error in the server' });
            }else{
                if(!animalStored){
                    res.status(404).send({ message: 'Error, The animal has not been saved' });
                }else{
                    res.status(200).send({ animal: animalStored });
                }
            }
        });
    }else{
        res.status(200).send({
            message: 'The name field is required'
        });
    }
}

module.exports = {
    testAnimal,
    saveAnimal,
    ANIMAL_CONSTANTS
}