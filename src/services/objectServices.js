const objectBD = require('../database/Object')

const admin = require('firebase-admin')



const getAllObjects = async() => {
    try{
        const allObjects = objectBD.getAllObjects();
        return allObjects;
    }
    catch{
        throw error;
    }
}


module.exports = {
    getAllObjects,
}