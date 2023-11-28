const User = require('../models/userModel')
const Artifact = require('../models/artifactModel')
const UserDb = require('./User')

const getAllArtifacts = async() => {
    try{
        const allArtifacts = await Artifact.find()
        return allArtifacts;
    }
    catch(error){
        throw error;
    }
}

const findArtifactByName = async (artifactName) => {
    try{
        const artifact = await Artifact.find({name: artifactName})   

        return artifact;
    }
    catch (error){
        throw error;
    }

}

const updateArtifact = async (artifactName, isFound, email) => {
    try{
        let updatedArtifact;
        if(isFound === true){
            const who = await UserDb.findUserByEmail(email)

            await Artifact.find({name: artifactName})
                .populate("foundBy")
                .exec();

            await Artifact.updateOne({name: artifactName}, {found: isFound, foundBy: who[0]});
            updatedArtifact = await Artifact.findOne({ name: artifactName }).populate(
                "foundBy"
              );
        }
        else{

            await Artifact.find({name: artifactName})
                
            await Artifact.updateOne({name: artifactName}, {found: isFound});
            updatedArtifact = await Artifact.findOne({ name: artifactName })
            .populate(
                "foundBy"
              );

              updatedArtifact.depopulate('foundBy')
        }

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