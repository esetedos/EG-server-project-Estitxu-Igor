const { Decimal128, Double } = require('mongodb');
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
    diseases: Object,
    imgURL: String,
    lat: Double,
    lon: Double
})

module.exports = mongoose.model('User', userSchema);