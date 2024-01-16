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





module.exports = {
    getAllObjects,

}
