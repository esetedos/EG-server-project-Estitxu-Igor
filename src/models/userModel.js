
const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    rol: String,
    logState: Boolean,
    towerAccess: Boolean,
    characterMainData: Object,
    characterStats: Object,
    characterMaxStats: Object,
    diseases: Object,
    imgURL: String,
    latitude: Number,
    longitude: Number

})

module.exports = mongoose.model('User', userSchema);