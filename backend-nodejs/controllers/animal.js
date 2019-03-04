'use strict'

//Modules
var fs = require('fs');
var path = require('path');
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


/**
 * Method Upload Imagen Animal
 * @param {*} req 
 * @param {*} res 
 */
function uploadImage(req, res){
    var animalId = req.params.id;
    var file_name = 'No upload...';

    console.log('req.files', req.files);

    if(req.files){
        // File Path
        var file_path = req.files.image.path;
        var file_split = file_path.split("/");
        var file_name = file_split[2];

        //Extension 
        var ext = file_name.split('\.');
        var file_ext = ext[1].toLowerCase();

        if( file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {

            /*if( animalId != req.user.sub ){
                res.status(500).send({message: "Don´t have permission to update user"});
            } */

            //Valid if the animal have a image
            Animal.findOne({ _id: animalId }, (err, animal) => {
                if(err){
                    res.status(500).send({ message: "Error to deleting the file" });
                }else{
                    console.log('animal', animal);
                    if( animal && animal.image != "" ){
                        var file_path_to_remove = ANIMAL_CONSTANTS.upload_animal + animal.image;
                        fs.unlink( file_path_to_remove, (err) => {
                            if(err){
                                return res.status(200).send({ message: "Error to deleting the previous file" });
                            }
                        });
                    }
                }
            });

            //Update the image 
            Animal.findByIdAndUpdate(animalId, { image: file_name }, { new: true }, (err, animalUpdated) => {
                if(err){
                    res.status(500).send({
                        message: "Error to update image"
                    });
                }else{
                    if( !animalUpdated) {
                        res.status(404).send({message: "The animal no has been update in database"});
                    }else{
                        res.status(201).send({ animal: animalUpdated, image: file_name });
                    }
                }
            });
        }else{
            //Delete the file if the extension isn’t valid
            fs.unlink( file_path, (err) => {
                if(err){
                    return res.status(200).send({ message: "Extension of the image is valid and the file wasn´t deleted" });
                }else{
                    return res.status(200).send({ message: "Extension of the image is valid" });
                }
            });
        }
    }else{
        return res.status(200).send({ message: "Image is required" });
    } 
}

/**
 * Method getImageFile
 * @param {*} req 
 * @param {*} res 
 */
function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var file_path = ANIMAL_CONSTANTS.upload_animal + imageFile; 
    fs.exists( file_path, function (exists) {
        if(exists){
            res.sendFile(path.resolve(file_path));
        }else{
            return res.status(404).send({ message: "The file not exists" }); 
        }
    });
}

/**
 * Method Animal Delete
 * @param {*} req 
 * @param {*} res 
 */
function deleteAnimal(req, res){
    var animalId = req.params.id;
    var update = req.body;
    Animal.findByIdAndDelete(animalId, update, (err, animalRemoved) => {
        if(err){
            res.status(500).send({ message: "Error in the request"});
        }else{
            if( !animalRemoved ) {
                res.status(404).send({message: "The animal no has been delete in database"});
            }else{

                if( animalRemoved && animalRemoved.image !="" || animalRemoved.image !="null"){
                    var file_path_to_remove = ANIMAL_CONSTANTS.upload_animal + animalRemoved.image;
                    fs.unlink( file_path_to_remove, (err) => {
                        if(err){
                            return res.status(200).send({ message: "Error to deleting the previous file" });
                        }
                    });
                }
                res.status(201).send({ user: animalRemoved });
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
    getImageFile,
    uploadImage,
    deleteAnimal,
    ANIMAL_CONSTANTS
}