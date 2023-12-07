const userDB = require('../database/User')

const admin = require('firebase-admin')



const getAllUsers = async() => {
    try{
        const allUsers = userDB.getAllUsers();
        return allUsers;
    }
    catch{
        throw error;
    }
}

const verifyUser = async (req) => {
    const token = req;
    console.log('*********************TOKEN EN SERVICE *************************')
    console.log(token.token)
    const decodedToken = await admin.auth().verifyIdToken(token.token)
    console.log('******************Decoded tokens mail*********************')
    console.log(decodedToken.email)

    const tokenUser = await userDB.findUserByEmail(decodedToken.email)
    let finalUser;

    console.log('*******************tokenUser prior to if***********************')
    console.log(tokenUser)
    console.log('********************token users name**************')


    if(!tokenUser[0]){
        const rol = checkRol(decodedToken.email)
        // finalUser = await userDB.updateUser(decodedToken.email)
        finalUser = await userDB.insertNewUser(decodedToken, rol)
    }
    else{
        // finalUser = await userDB.insertNewUser(decodedToken)
        finalUser = await userDB.updateUser(decodedToken.email)
    }

    console.log('*********************FINAL USER******************')
    console.log(finalUser)
    return finalUser;
}

const verifyQR = async (mail) => {
    const userToValidateQR = await userDB.findUserByEmail(mail);
    console.log('*********** USER ON SERVICE AFTER FIND **************')
    console.log(userToValidateQR[0].towerAccess)
    let towerAccessState; 
    if(userToValidateQR[0].towerAccess === true){
        towerAccessState = false;
    }
    else if(userToValidateQR[0].towerAccess === false){
        towerAccessState = true
    }
    console.log('************* NEW TOWER ACCESS STATE**************')
    console.log(towerAccessState)
    const finalUser = await userDB.updateQR(towerAccessState, mail)
    console.log('******* RETURNED USER IN QR VALIDATION SERVICE *********************')
    console.log(finalUser)
    return finalUser;
}

const checkRol = (email) => {
    let rol;

    if(email.includes('@ikasle.aeg.eus')){
        rol = 'Acolito'
    }
    else if(email.includes('@aeg.eus')){
        switch(email){
            case 'ozarate@aeg.eus':
                rol = 'Villano'
            break;
            case 'oskar.calvo@aeg.eus':
                rol = 'Mortimer'
            break;
            case 'classcraft.daw2@aeg.eus':
                rol = 'Istvan'
            break;
            case 'jacob@aeg.eus':
                rol = 'Jacob'
            break
        }
    }
    else 
        rol = undefined;
    
    return rol;
}

const updatedUser = async (userEmail, dataName, value) => {

    const finalUser = await userDB.updatedUserAtribute(userEmail, dataName, value)
    return finalUser;    
}

const fullRestoreUser = async (userEmail) => {
    const previousUser = await userDB.findUserByEmail(userEmail);
    const dataName = "characterStats"

    const maxStrength       = previousUser.characterMaxStats.maxStrength
    const maxAgility        = previousUser.characterMaxStats.maxAgility
    const maxIntelligence   = previousUser.characterMaxStats.maxIntelligence

    const newCharacterStats = {
        stamina: 100,
        strength: maxStrength,
        agility: maxAgility,
        intelligence: maxIntelligence
    }
    
    const updatedUser = await updatedUser(userEmail, dataName, newCharacterStats)

    return updatedUser
}

const getOneUser = async (email) => {
    try{
        const user = userDB.findUserByEmail(email);
        return user;
    }
    catch (error){
        throw error;
    }
}

module.exports = {
    getAllUsers,
    verifyUser,
    verifyQR,
    updatedUser,
    fullRestoreUser,
    getOneUser,
}