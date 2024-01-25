const Affect = require('../services/affectServices')
const Object = require('../services/objectServices')

const Jwt = require('../JWT/generateJWT')

const getAllAffects = async(req, res) => {
    try{
        const allAffect = await Affect.getAllAffects();
        res.send({status: "OK", data: allAffect})
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
    getAllAffects
    
}