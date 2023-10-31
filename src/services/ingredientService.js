const Ingredient = require('../database/Ingredient')

const admin = require('firebase-admin')



const getAllIngredients = async() => {
    try{
        const allIngredients = Ingredient.getAllIngredients();
        return allIngredients;
    }
    catch{
        throw error;
    }
}

module.exports = {
    getAllIngredients
}