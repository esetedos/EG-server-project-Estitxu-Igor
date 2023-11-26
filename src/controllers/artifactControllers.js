const Artifact = require('../services/artifactService')
const User = require('./../models/userModel')

const getAllArtifacts = async(req, res) => {
    try{
        const allArtifacts = await Artifact.getAllArtifacts();
        if(allArtifacts.length === 0){
            return res.status(404).send({message: 'No existen artifactos'})
        }

        res.send({status: "OK", data: allArtifacts})
    }
    catch(error){
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED',
                    message: 'Error al realizar la petición:',
                    data: {error: error?.message || error} });
    }
}

const getOneArtifact = async (req, res) => {
    const {params: {name: artifactName }} = req;

    if(!artifactName){
        return res.status(400)
        .send({
            status: "FAILED",
            data: {error: "Parameter ':name' can not be empty"},
        });
    }

    try {
        const artifact = await Artifact.getOneArtifact(artifactName);
        if(!artifact){
            return res .status(404)
            .send({ status: "FAILED",
                data: { error: `Cant find artifact with the id '${artifactName}'`} });
        }
        res.send({
            status: "OK",
            data: artifact
        })

        
    }
    catch (error) {
        res .status(error?.status || 500) 
        .send({status: "FAILED",
    message: "Error al realizar la petición:",
        data: { error: error?.message || error}});
    }
};





const updateArtifact = async(req, res) => {
    const {body} = req;

    if(!body || !body.name ) {
        return res .status(400).send({ status: "FAILED", data: {error: "Parameter ':slot' can not be empty"}, })
    }
    try{
        const updatedArtifact = await Artifact.updateArtifact(body.name, body.found);

        if(!updatedArtifact){
            return res
            .status(404)
            .send({ status: "FAILED",
            data: { error: `can't find artifact with the name '${body.name}`} });
        }

        res.send({ status: "OK", data: updatedArtifact });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error} });
    }
};



module.exports = {
    getAllArtifacts,
    getOneArtifact,
    updateArtifact
}