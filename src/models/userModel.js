<<<<<<< HEAD
=======

>>>>>>> staging
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
<<<<<<< HEAD
    diseases: Object,
    imgURL: String
=======
    characterMaxStats: Object,
    diseases: Object,
    imgURL: String,
    latitude: Number,
    longitude: Number

>>>>>>> staging
})

module.exports = mongoose.model('User', userSchema);