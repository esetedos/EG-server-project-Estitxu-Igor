const User = require('../services/userServices')
const Jwt = require('../JWT/generateJWT')

const getAllUsers = async(req, res) => {
    try{
        const allUsers = await User.getAllUsers();
        if(allUsers.length === 0){
            return res.status(404).send({message: 'No existen users'})
        }

        res.send({status: "OK", data: allUsers})
    }
    catch(error){
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED',
                    message: 'Error al realizar la petición:',
                    data: {error: error?.message || error} });
    }
}

const verifyUser = async (req, res) => {
    console.log('*********************RAW REQUEST**********************')
    console.log(req.body)
    const {body} = req;

    try{
        
        const decodedToken = await User.verifyUser(body);
        if(!decodedToken){
            return res
                .status(201).send({
                    status: 'FAILED',
                    data: {error: `Token not found`}
                })
        }
        else{
            console.log('*************** VERIFIED USER TO CLIENT *******************')
            console.log(decodedToken)
            res.status(201).send({ status: "OK", data: decodedToken });
        }

    }catch(error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED",
                    message: "Error al realizar la petición:",
                    data: { error: error?.message || error }  });
    }
};

const verifyQR = async (req, res) => {
    console.log('***************** VERIFY QR ROUTE CALLED **********')
    const {body} = req;
    console.log(body)
    
    try{
    const user = await User.verifyQR(body.email);
        if(!user){
            return res
                .status(201).send({
                    status: 'FAILED',
                    data: {error: `User not found`}
                })
        }
        else
            res.status(201).send({ status: "OK", data: user });
    }
    catch(error){
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED',
                    message: 'Error al realizar la petición:',
                    data: {error: error?.message || error} });
    }

}

const updateUser = async(req, res) => {
    const {body} = req;


    if(!body || !body.email || !body.data || !body.value) {
        return res .status(400).send({ status: "FAILED", data: {error: "Parameters can not be empty"}, })
    }
    try{
        const updatedUser = await User.updatedUser(body.email, body.data, body.value);

        if(!updatedUser){
            return res
            .status(404)
            .send({ status: "FAILED",
            data: { error: `can't find user with the email '${body.email}`} });
        }

        res.send({ status: "OK", data: updatedUser });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED",
                message: "Error al realizar la petición:",
                data: { error: error?.message || error} });
    }
};


const getOneUser = async (req, res) => {
    const {body} = req;

    if(!body){
        return res.status(400)
        .send({
            status: "FAILED",
            data: {error: "Parameter 'email' can not be empty"},
        });
    }
    try {
        const user = await User.getOneUser(body.email);
        if(!body.email){
            return res .status(404)
            .send({ status: "FAILED",
                data: { error: `Cant find artifact with the email '${body.email}'`} });
        }
        res.send({
            status: "OK",
            data: user
        })
    }
    catch (error) {
        res .status(error?.status || 500) 
        .send({status: "FAILED",
    message: "Error al realizar la petición:",
        data: { error: error?.message || error}});
    }
};

const getEmailJWT = async (req, res) => {
    const {body} = req;

    try {
        const jwAccessToken = Jwt.generateAccessToken(body.email);
        const jwRefreshToken = Jwt.generateRefreshToken(body.email);

        const jwToken = {
            access: jwAccessToken,
            refresh: jwRefreshToken
        }
        if(!body.email){
            return res .status(404)
            .send({ status: "FAILED",
                data: { error: `Cant find artifact with the email '${body.email}'`} });
        }
        res.send({
            status: "OK",
            data: jwToken
        })
    }
    catch (error) {
        res .status(error?.status || 500) 
        .send({status: "FAILED",
    message: "Error al realizar la petición:",
        data: { error: error?.message || error}});
    }
};

const verifyObject = async (req, res) => {
    console.log('***************** VERIFY QR ROUTE CALLED **********')
    const {body} = req;
    console.log(body)
    
    try{
    const user = await User.verifyObject(body.email, body.idObject);
        if(!user){
            return res
                .status(201).send({
                    status: 'FAILED',
                    data: {error: `User not found`}
                })
        }
        else
            res.status(201).send({ status: "OK", data: user });
    }
    catch(error){
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED',
                    message: 'Error al realizar la petición:',
                    data: {error: error?.message || error} });
    }

}

const emptyInventory = async (req, res) => {
    console.log('***************** VERIFY QR ROUTE CALLED **********')
    
    
    try{
    const users = await User.emptyInventory();
        if(!users){
            return res
                .status(201).send({
                    status: 'FAILED',
                    data: {error: `User not found`}
                })
        }
        else
            res.status(201).send({ status: "OK", data: users });
    }
    catch(error){
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED',
                    message: 'Error al realizar la petición:',
                    data: {error: error?.message || error} });
    }

}



module.exports = {
    getAllUsers,
    verifyUser,
    verifyQR,
    updateUser,
    getOneUser,
    getEmailJWT,
    verifyObject,
    emptyInventory,
}