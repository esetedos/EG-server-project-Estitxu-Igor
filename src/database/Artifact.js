const Artifact = require('../models/artifactModel')

const getAllArtifacts = async() => {
    try{
        const allArtifacts = await Artifact.find();
        return allArtifacts;
    }
    catch(error){
        throw error;
    }
}

const findArtifactByName = async (artifactName) => {
    try{
        const artifact = await Artifact.find({name: artifactName})
        console.log(artifact);
        return artifact;
    }
    catch (error){
        throw error;
    }
}

const updateArtifact = async (artifactName, isFound) => {    
    try{

        await Artifact.updateOne({name: artifactName}, {found: isFound});
        const updatedArtifact = await Artifact.find({name: artifactName});
        return updatedArtifact;
    }
    catch (error){
        throw error;
    }
}

module.exports = {
    getAllArtifacts,
    findArtifactByName,
    updateArtifact
}