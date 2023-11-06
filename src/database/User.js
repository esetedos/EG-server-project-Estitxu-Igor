const User = require('../models/userModel')

const getAllUsers = async() => {
    try{
        const allUsers = await User.find();
        return allUsers;
    }
    catch(error){
        throw error;
    }
}

const insertNewUser = async (token, role) => {
    try
    {
        
        console.log("***************insert new character*****************")
        console.log('**********photo URL*****************')
        console.log(token.photoURL)
        console.log(token)
        let userToInsert = new User({
            name: token.name,
            email: token.email,
            logState: true,
            towerAccess: false,
            rol: role,
            characterMainData: {
                HP: 100,
                LvL: 1,
                Money: 10
            },
            characterStats: {
                stamina: 100,
                strength: 10,
                resistance: 10,
                agility: 10,
                intelligence: 10 
            },
            diseases: {
                hunger: false,
                blindness: false,
                madness: false,
                fear: false,
                paralized: false,
                psychosis: false
            },
            imgURL : token.picture
        });
        await userToInsert.save();
        return userToInsert;
    }
    catch (error){
        throw error;
    }
};

const findUserByEmail = async (mail) => {
    try{
        const tokenUser = await User.find({email: mail})
        console.log('************* RESULT FIND BY TOKEN *************************');
        console.log(tokenUser);
        return tokenUser;
    }
    catch (error){
        throw error;
    }
}

const updateUser = async (mail) => {
    console.log('**********update user at log in**********************')
    try{
        await User.updateOne({email: mail}, {logState: true});
        const updatedUser = await User.find({email: mail});
        return updatedUser;
    }
    catch (error){
        throw error;
    }
}

const updateQR = async (towerAccessState, mail) => {
    try{
        await User.updateOne({email: mail}, {towerAccess: towerAccessState});
        const updatedUser = await User.find({email: mail});
        return updatedUser;
    }
    catch (error){
        throw error;
    }
}



module.exports = {
    getAllUsers,
    insertNewUser, 
    findUserByEmail,
    insertNewUser,
    updateUser,
    updateQR,
}
