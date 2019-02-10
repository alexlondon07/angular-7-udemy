'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo-backend-db', { useNewUrlParser: true })
.then(() => {
    console.log('The conexion to database has been successful');

    app.listen(port, () => {
        console.log('Server is running for port ' + port)
    })
}).catch(err=>console.log(err));