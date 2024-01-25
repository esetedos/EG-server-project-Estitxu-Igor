const mongoose = require('mongoose');

const {Schema} = mongoose;

const affectionSchema = new Schema({
    id: String,
    type: String,
    name: String,
    image: String,
    damage_attribute: String,
    damage_percentage: String,
    healing_effects: Array
})

module.exports = mongoose.model('Affection', affectionSchema);
