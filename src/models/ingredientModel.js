const mongoose = require('mongoose');

const {Schema} = mongoose;

const ingredientSchema = new Schema({
    name: String,
    effects: Array
})

module.exports = mongoose.model('Ingredient', ingredientSchema);