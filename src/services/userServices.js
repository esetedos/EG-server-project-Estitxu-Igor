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

module.exports = {
    getAllUsers,
    verifyUser
}