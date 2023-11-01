const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    logState: Boolean,
    characterMainData: Object,
    characterStats: Object,
    diseases: Object
})


module.exports = mongoose.model('User', userSchema);