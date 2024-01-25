const Affection = require('../models/affectionModel.js')

const getAllAffections = async() => {
    try{
        const allAffections = await Affection.find();
        return allAffections;
    }
    catch(error){
        console.log("done") 
        throw error;
    }
}

const findAffectionByID = async (id) => {
    try{
        const affection = await User.find({id: id})
        return affection;
    }
    catch (error){
        throw error;
    }
}

module.exports = {
    getAllAffections,
    findAffectionByID,
    
}