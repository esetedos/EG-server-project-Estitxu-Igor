const User = require('../services/userServices')

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
   
    if(!body){
         res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                    "error: token can't be empty",
                },
            });
            return;
    }

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
    if(!body){
        res
           .status(400)
           .send({
               status: "FAILED",
               data: {
                   error:
                   "error: email can't be empty",
               },
           });
           return;
   }
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

module.exports = {
    getAllUsers,
    verifyUser,
    verifyQR
}