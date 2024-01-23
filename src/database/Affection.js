const Affection = require('../models/affectionModel.js')

const getAllAffections = async() => {
    try{
        const allAffections = await Affection.find();
        return allAffections;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    getAllAffections
}