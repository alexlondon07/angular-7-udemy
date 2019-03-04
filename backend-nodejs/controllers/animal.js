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

/**
 * Method getAnimals
 * @param {*} req 
 * @param {*} res 
 */
function getAnimals(req, res){
    Animal.find({}).populate({path: 'user'}).exec((err, animals) => {
        if(err){
            res.status(500).send({
                message: 'Error in the request'
            });
        }else{
            if(!animals){
                res.status(404).send({ message: 'Animals no found' });
            }else{
                res.status(200).send({ animals });
            }
        }
    });
}

/**
 * Method getAnimalById
 * @param {*} req 
 * @param {*} res 
 */
function getAnimalById(req, res){
    var animalId =  req.params.id;
    Animal.findById(animalId).populate({path: 'user'}).exec((err, animal) =>{
        if(err){
            res.status(500).send({
                message: 'Error in the request'
            });
        }else{
            if(!animal){
                res.status(404).send({ message: 'Animal no found' });
            }else{
                res.status(200).send({ animal });
            }
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function updateAnimal(req, res){
    var animalId = req.params.id;
    var update = req.body;
    Animal.findByIdAndUpdate(animalId, update, {new: true}, (err, animalUpdated) => {
        if(err){
            res.status(500).send({
                message: "Error to update Animal"
            });
        }else{
            if( !animalUpdated) {
                res.status(404).send({message: "The animal no has been update in database"});
            }else{
                res.status(201).send({ user: animalUpdated });
            }
        }
    });
}

module.exports = {
    testAnimal,
    saveAnimal,
    getAnimals,
    getAnimalById,
    updateAnimal,
    ANIMAL_CONSTANTS
}