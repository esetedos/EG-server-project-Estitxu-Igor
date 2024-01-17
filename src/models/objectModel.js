
const mongoose = require('mongoose');

const {Schema} = mongoose;

const objectSchema = new Schema({
    name: String,
    imgURL: String,
    retrieved: Boolean,
    id: String,
})

module.exports = mongoose.model('Object', objectSchema);