'use strict'

//Modules
var bcrypt = require('bcrypt-nodejs');

//Models
var User = require('../models/user');

//Actions
function test(req, res){
    res.status(200).send({
        message: 'Test the contoller and test action'
    });
}

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
                res.status(500).send({message: "Error validating User’s email"});
            }else{
                if(!issetUser){
                    bcrypt.hash(params.params, null, null, function (err, hash ) {
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
                    res.status(200).send({ message: 'The user already exists' });
                }
            }
        });
    }else{
        res.status(200).send({ message: 'Enter all fields correctly for to register the user' });
    }
}

module.exports = {
    test, saveUser
}