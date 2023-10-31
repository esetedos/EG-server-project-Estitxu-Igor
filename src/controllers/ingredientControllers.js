const Ingredient = require('../services/ingredientService')

const getAllIngredients = async(req, res) => {
    try{
        const allIngredients = await Ingredient.getAllIngredients();
        if(allIngredients.length === 0){
            return res.status(404).send({message: 'No existen ingredientes'})
        }

        res.send({status: "OK", data: allIngredients})
    }
    catch(error){
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED',
                    message: 'Error al realizar la petición:',
                    data: {error: error?.message || error} });
    }
}



module.exports = {
    getAllIngredients
}