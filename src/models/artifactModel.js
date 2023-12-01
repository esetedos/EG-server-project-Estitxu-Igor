
const mongoose = require('mongoose');
const { Int32 } = require('mongodb');


const {Schema} = mongoose;
const User = require('../models/userModel')

const userModel = require('./userModel')



const artifactSchema = new Schema({
    name: String,
    // slot: Integer,
    img: String,
    found: Boolean,
    foundBy: [{type: Schema.ObjectId, ref: "User"}]

})

module.exports = mongoose.model('Artifact', artifactSchema);
