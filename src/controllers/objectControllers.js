const Object = require('../services/objectServices')
const Jwt = require('../JWT/generateJWT')

const getAllObjects = async(req, res) => {
    try{
        const allObject = await Object.getAllObjects();
        res.send({status: "OK", data: allObject})
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
    getAllObjects,
}