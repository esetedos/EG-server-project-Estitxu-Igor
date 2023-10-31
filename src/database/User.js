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

const insertNewUser = async (token) => {
    try
    {
        console.log("***************insert new character*****************")
        let userToInsert = new User({
            name: token.name,
            email: token.email,
            logState: true,
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
            }
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
        const updatedUser = await User.findOneAndUpdate( {email: mail}, {logState: true})
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
    updateUser
}