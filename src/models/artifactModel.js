
const mongoose = require('mongoose');


const {Schema} = mongoose;
const userModel = require('./userModel')

const artifactSchema = new Schema({
    name: String,
    // slot: Integer,
    description_es: String,
    description_en: String,
    img: String,
    found: Boolean,
    user: [{type: Schema.ObjectId, ref: "userModel"}]

})

module.exports = mongoose.model('Artifact', artifactSchema);
