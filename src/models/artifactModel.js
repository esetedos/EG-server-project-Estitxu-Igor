
const mongoose = require('mongoose');
const User = require('../models/userModel')

const {Schema} = mongoose;
const userModel = require('./userModel')

const artifactSchema = new Schema({
    name: String,
    // slot: Integer,
    description_es: String,
    description_en: String,
    img: String,
    found: Boolean,
    foundBy: [{type: Schema.ObjectId, ref: "User"}]

})

module.exports = mongoose.model('Artifact', artifactSchema);
