'use strict'

//Modules
var bcrypt = require('bcrypt-nodejs');

//Models
var User = require('../models/user');

//Services jwt
var jwt = require('../services/jwt');

//Actions
function test(req, res){
    res.status(200).send({
        message: 'Test the contoller and test action'
    });
}

//Texts
var msjErrorEmail = "Error validating User’s email";
var msjUserAlreadyExists = "The user already exists";

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

module.exports = {
    test, 
    saveUser,
    login
}