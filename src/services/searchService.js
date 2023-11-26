const Search = require('../database/Search')

const admin = require('firebase-admin')



const getSearch = async() => {
    try{
        const search = Search.getSearch(0);
        return search;
    }
    catch{
        throw error;
    }
}

const updateStatus = async(newState) => {
        const finalState = await Search.updateStatus(newState)
        return finalState;


}

module.exports = {
    getSearch,
    updateStatus
}