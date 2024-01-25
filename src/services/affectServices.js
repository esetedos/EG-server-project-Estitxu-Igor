const affectBD = require('../database/Affection')

const admin = require('firebase-admin')



const getAllAffects = async() => {
    try{
        const allAffects = affectBD.getAllAffections();
        return allAffects;
    }
    catch{
        throw error;
    }
}





module.exports = {
    getAllAffects,
}