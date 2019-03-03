'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    animal: String,
    description: String,
    year: String,
    image: String,
});

module.exports = mongoose.model('Animal', AnimalSchema);