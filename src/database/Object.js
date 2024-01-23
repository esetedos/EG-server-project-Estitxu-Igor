const Object = require('../models/objectModel')

const getAllObjects = async() => {
    try{
        const allObject = await Object.find();
        return allObject;
    }
    catch(error){
        throw error;
    }
}

const openRetrieval = async(idObject) => {
    try{

        await Object.updateOne({id: idObject}, { retrieved: true});

        const object = await Object.find({id: idObject})

        return object;
    }
    catch(error){
        throw error;
    }
}

const closeRetrievals = async() => {
    try{

        const allObject = await Object.find();
        console.log("****************************")
        

        allObject.forEach( async object => {
            await Object.updateOne({id: object.id}, { retrieved: false});

        })
        const newObjectList = await Object.find();

    

        return newObjectList;
    }
    catch(error){
        throw error;
    }
}





module.exports = {
    getAllObjects,
    openRetrieval,
    closeRetrievals,
}
