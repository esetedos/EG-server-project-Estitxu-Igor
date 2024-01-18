const User = require('../models/userModel')
const Object = require('../models/objectModel')

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
        const strengthStart     = Math.floor(Math.random() * (100 - 73 + 1) + 73);
        const agilityStart      = Math.floor(Math.random() * (100 - 24 + 1) + 24);
        const inteligenceStart  = Math.floor(Math.random() * (100 - 20 + 1) + 20);
        
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
                strength: strengthStart,
                agility: agilityStart,
                intelligence: inteligenceStart 
            },
            characterMaxStats: {
                maxStamina: 100,
                maxStrength: strengthStart,
                maxAgility: agilityStart,
                maxIntelligence: inteligenceStart 
            },
            diseases: {
                hunger: false,
                blindness: false,
                madness: false,
                fear: false,
                paralized: false,
                psychosis: false
            },
            imgURL : token.picture,
            latitude: 0,
            longitude: 0
        });
        await userToInsert.save();
        const userArray = [userToInsert]
        return userArray;
    }
    catch (error){
        throw error;
    }
};

const findUserByEmail = async (mail) => {
    try{
        const tokenUser = await User.find({email: mail})
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

const updatedUserAtribute = async (userEmail, dataName, value) => {

    try{


        // if(dataName === "")
        const updateObj = {};
        updateObj[dataName] = value;

        await User.updateOne({email: userEmail}, { $set: updateObj });
        const updatedUser = await User.find({email: userEmail});
        return updatedUser;


          

    }
    catch (error){
        throw error;
    }
}

const updateUserObject = async (mail, idObject) => {
    try{
        const user = await User.find({email: mail})
        // const object = await Object.find({id: idObject})
        console.log("***************finded user**************")
        user[0].inventory.push(idObject)
        console.log("************updated user*************")
        console.log(user)
        await User.updateOne({email: mail}, { inventory: user[0].inventory });
        
        return user;
    }
    catch (error){
        throw error;
    }
}

const emptyInventory = async () => {
    try{
        const userList = await User.find()
        console.log("****************************")
        

        userList.forEach( async user => {
            await User.updateOne({email: user.email}, { inventory: []});
            // await User.find({email: user.email});
            console.log(user)
            console.log("****************************")

        })
        const newUserList = await User.find()

        console.log(newUserList)
        return newUserList;
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
    updatedUserAtribute,
    updateUserObject,
    emptyInventory,
}
