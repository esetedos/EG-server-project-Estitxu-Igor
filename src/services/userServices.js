const User = require('../database/User')

const admin = require('firebase-admin')



const getAllUsers = async() => {
    try{
        const allUsers = User.getAllUsers();
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

    const tokenUser = await User.findUserByEmail(decodedToken.email)
    let finalUser;

    console.log('*******************tokenUser prior to if***********************')
    console.log(tokenUser)
    console.log('********************token users name**************')


    if(!tokenUser[0]){
        const rol = checkRol(decodedToken.email)
        // finalUser = await User.updateUser(decodedToken.email)
        finalUser = await User.insertNewUser(decodedToken, rol)
    }
    else{
        // finalUser = await User.insertNewUser(decodedToken)
        finalUser = await User.updateUser(decodedToken.email)
    }

    console.log('*********************FINAL USER******************')
    console.log(finalUser)
    return finalUser;
}

const verifyQR = async (mail) => {
    const userToValidateQR = await User.findUserByEmail(mail);
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
    const finalUser = await User.updateQR(towerAccessState, mail)
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

module.exports = {
    getAllUsers,
    verifyUser,
    verifyQR
}