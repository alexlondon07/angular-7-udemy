'use strict'

function test(req, res){
    res.status(200).send({
        message: 'Test the contoller and test action'
    });
}

module.exports = {
    test
}