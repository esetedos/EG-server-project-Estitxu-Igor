const searchService = require('../services/searchService')

const getSearch = async(req, res) => {
    
    try{
        const search = await searchService.getSearch(0);
        if(!search){
            return res.status(404).send({message: 'No existe ningún search'})
        }

        res.send({status: "OK", data: search})
    }
    catch(error){
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED',
                    message: 'Error al realizar la petición:',
                    data: {error: error?.message || error} });
    }
}

const updateState = async(req, res) => {
    const {body} = req;   

    if(!body || !body.validation) {
        return res .status(400).send({ status: "FAILED", data: {error: "Parameter ':validation' can not be empty"}, })
    }

    try{
        const updatedStatus  = await searchService.updateStatus(body.validation);

        if(!updatedStatus){
            return res
            .status(404)
            .send({ status: "FAILED",
            data: { error: `can't find artifact with the name '${body.validation}`} });
        }

        res.send({ status: "OK", data: updatedStatus });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error} });
    }
};


module.exports = {
    getSearch,
    updateState
}