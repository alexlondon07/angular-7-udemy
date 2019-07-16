'use strict'

//Modules
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

//Models
var User = require('../models/user');

//Services jwt
var jwt = require('../services/jwt');

//Constants
var USER_CONSTANTS = {
    upload_user: './uploads/users/'
}

//Actions
function test(req, res){
    res.status(200).send({
        message: 'Test the contoller and test action',
        user: req.user
    });
}

//Texts
var msjErrorEmail = "Error validating User’s email";
var msjUserAlreadyExists = "The user already exists";

/**
 * Method User Save
 * @param {*} req 
 * @param {*} res 
 */
function saveUser(req, res){

    //Create Object User
    var user = new User();

    //Get params
    var params = req.body;

    if( params.password && params.name && params.surname && params.email ){
        //Assign values to object from User 
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        //Validate Email if exists
        User.findOne({ email: user.email.toLowerCase()}, (err, issetUser) =>{
            if(err){
                res.status(500).send({message: msjErrorEmail });
            }else{
                if(!issetUser){
                    bcrypt.hash(params.password, null, null, function (err, hash ) {
                        user.password = hash;
            
                        //Save User in DataBase
                        user.save( (err, UserStored) => {
                            if(err){
                                res.status(500).send({message: "Error saving user"});
                            }else{
                                if(!UserStored){
                                    res.status(404).send({message: "The user no has been register in database"});
                                }else{
                                    res.status(200).send({ user: UserStored });
                                }
                            }
                        })
                    });
                }else{
                    res.status(200).send({ message: msjUserAlreadyExists });
                }
            }
        });
    }else{
        res.status(200).send({ message: 'Enter all fields correctly for to register the user' });
    }
}

/**
 * Method User Login
 * @param {*} req 
 * @param {*} res 
 */
function login(req, res){
    var params = req.body;
    var email =  params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500).send({ message: msjErrorEmail });
        }else{
            if(user){
                bcrypt.compare(password, user.password, function(err, check)  {
                    if(check){
                        //Validate and Generate Token
                        if(params.gettoken){    
                            res.status(200).send({ 
                                token: jwt.createToken(user)
                            });
                        }else{
                            // Passwords match
                            res.status(200).send({ user });
                        }
                    }else{
                        // Passwords don't match
                        res.status(404).send({
                            message: 'Password is incorrect'
                        });
                    }
                });
            }else{
                res.status(404).send({
                    message: 'User was unable to enter the system'
                });
            }
        }
    });
}

/**
 * Method User Update
 * @param {*} req 
 * @param {*} res 
 */
function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;
    delete update.password;

    if( userId != req.user.sub ){
        return res.status(200).send({
            message: "Don´t have permissions to update the user"
        });
    }

    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
        if(err){
            res.status(500).send({
                message: "Error to update User"
            });
        }else{
            if( !userUpdated) {
                res.status(404).send({message: "The user no has been update in database"});
            }else{
                res.status(201).send({ user: userUpdated });
            }
        }
    });
}

/**
 * Method Upload Imagen
 * @param {*} req 
 * @param {*} res 
 */
function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No upload...';
    if( req.params.files ){

        // File Path
        var file_path = req.files.image.path;
        var file_split = file_path.split("/");
        var file_name = file_split[2];

        //Extension 
        var ext = file_name.split('\.');
        var file_ext = ext[1].toLowerCase();

        if( file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {

            if( userId != req.user.sub ){
                res.status(500).send({message: "Don´t have permission to update user"});
            }

            //Valid if the user have a image
            User.findOne({ _id: userId }, (err, user) => {
                if(err){
                    res.status(500).send({ message: "Error to deleting the file" });
                }else{
                    if( user && user.image != ""){
                        var file_path_to_remove = USER_CONSTANTS.upload_user + user.image;
                        fs.unlink( file_path_to_remove, (err) => {
                            if(err){
                                return res.status(200).send({ message: "Error to deleting the previous file" });
                            }
                        });
                    }
                }
            });

            //Update the image 
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
                if(err){
                    res.status(500).send({
                        message: "Error to update image"
                    });
                }else{
                    if( !userUpdated) {
                        res.status(404).send({message: "The user no has been update in database"});
                    }else{
                        res.status(201).send({ user: userUpdated, image: file_name });
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
    var file_path = USER_CONSTANTS.upload_user + imageFile; 
    fs.exists( file_path, function (exists) {
        if(exists){
            res.sendFile(path.resolve(file_path));
        }else{
            return res.status(404).send({ message: "The file not exists" }); 
        }
    });
}

/**
 * Method getKeepers
 * @param {*} req 
 * @param {*} res 
 */
function getKeepers(req, res) {
    User.find({ role: 'ROLE_ADMIN' }).exec( (err, users)=> {
        if(err){
            return res.status(500).send({ message: "Error in the request" }); 
        }else{
            if(!users){
                return res.status(404).send({ message: "Keepers not found" }); 
            }else{
                return res.status(200).send({ users }); 
            }
        }
    });
}


module.exports = {
    test, 
    saveUser,
    login, 
    updateUser,
    uploadImage,
    getImageFile,
    getKeepers,
    USER_CONSTANTS
}