const Search = require('../models/searchModel')

const getSearch = async() => {
    try{
        const search = await Search.find();
        return search;
    }
    catch(error){
        throw error;
    }
}

const updateStatus = async (newState) => {
    try{

        await Search.updateOne({}, {validation: newState});
        const updatedStatus = await Search.find({});
        return updatedStatus;
    }
    catch (error){
        throw error;
    }
}


module.exports = {
    getSearch,
    updateStatus
}