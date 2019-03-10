'use strict'

exports.isAdmin = function(req, res, next) {
    if(req.user.role != 'ROLE_ADMIN'){
        return res.status(200).send({message: 'Don´t have permission to do the request, only admin users'});
    }
    next();
};