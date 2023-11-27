const Artifact = require('../database/Artifact')

const admin = require('firebase-admin')



const getAllArtifacts = async() => {
    try{
        const allArtifacts = Artifact.getAllArtifacts();
        return allArtifacts;
    }
    catch{
        throw error;
    }
}


const getOneArtifact = async (artifactName) => {
    try{
        const artifact = Artifact.findArtifactByName(artifactName);
        return artifact;
    }
    catch (error){
        throw error;
    }
}



const updateArtifact = async (artifactName, isFound) => {

    const finalArtifact = await Artifact.updateArtifact(artifactName, isFound)
    return finalArtifact;    
}


const updateArtifacts = async (artifactArray) =>{
    const updatedArtifacts = []
    artifactArray.forEach(element => {
        const updatedElement = await Artifact.updateArtifact(element.name, element.found, element.who)
        updatedElement.push(updatedArtifacts)
    });
    return updatedArtifacts;
}
module.exports = {
    getAllArtifacts,
    getOneArtifact,
    updateArtifact,
    updateArtifacts
}