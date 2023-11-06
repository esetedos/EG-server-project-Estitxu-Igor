const Ingredient = require('../models/ingredientModel')

const getAllIngredients = async() => {
    try{
        const allIngredients = await Ingredient.find();
        return allIngredients;
    }
    catch(error){
        throw error;
    }
}







module.exports = {
    getAllIngredients
}
