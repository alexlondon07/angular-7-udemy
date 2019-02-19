'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_key_course_angular';


exports.ensureAuth = function (req, res, next) {
    if( !req.headers.authorization ){
        return res.status(403).send( { message: 'The request don’t have the header the authentication' });
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);
        if( payload.exp <= moment().unix() ){
            return res.status(401).send({
                message: 'The token has expired'
            });
        }
    } catch (ex) {
        console.log(ex);
        return res.status(404).send({
            message: 'The token is not valid' + ex
        })
    }
    req.user = payload;
    next();
}