
const mongoose = require('mongoose');
const { Int32 } = require('mongodb');


const {Schema} = mongoose;

const artifactSchema = new Schema({
    name: String,
    // slot: Integer,
    description_es: String,
    description_en: String,
    img: String,
    found: Boolean

})

module.exports = mongoose.model('Artifact', artifactSchema);
