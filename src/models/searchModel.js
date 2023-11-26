
const mongoose = require('mongoose');

const {Schema} = mongoose;

const searchSchema = new Schema({
    validation: String
})

module.exports = mongoose.model('search', searchSchema);
