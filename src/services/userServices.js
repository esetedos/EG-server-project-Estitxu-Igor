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
        // finalUser = await User.updateUser(decodedToken.email)
        finalUser = await User.insertNewUser(decodedToken)
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

module.exports = {
    getAllUsers,
    verifyUser,
    verifyQR
}