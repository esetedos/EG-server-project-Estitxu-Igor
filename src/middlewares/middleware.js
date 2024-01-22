require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyQR = async (req, res, next) => {
    const {body} = req;
    if(
        !body.email
    ) {
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

    next();
};

const verifyUser = async (req, res, next) => {
    const {body} = req;
    if(
        !body.token
    ) {
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

    next();
};






const authenticateToken = async (req, res, next) => {
    const {body} = req;
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]
   console.log("************************body.email************************")

console.log(body)
    console.log(body.email)
   if(body.email === "guest"){
        next();
   }
    else{
        if(!token) {
            console.log("UNAUTHORIZED")
            return res.sendStatus(401)
        }
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
            if(error) {
                console.log("FORBIDDEN")
                console.log(error)
                return res          
                .status(403)
                .send({
                    data: {
                        error: error
                    },
                });
            }
    
            else console.log('*************** ACCESS TOKEN VERIFIED ACCESS GRANTED ************************')
    
            req.email = email
            next()
        })
   }
   
}

const verifyEmail = async (req, res, next) => {
    const {body} = req;
    if(
        !body.email
    ) {
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

    next();
};

const validateToken = async (req, res, next) => {
    console.log("ENTERS REFRESH MIDDLEWARE")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        console.log("UNAUTHORIZED")
        return res.sendStatus(401)
    }
 
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, email) => {
        if(error) {
            console.log("FORBIDDEN")
            console.log(error)
            return res.sendStatus(403)
        }
        else console.log('*************** REFRESH TOKEN VERIFIED ACCESS GRANTED ************************')

        req.email = email
        next()
    })
 }

 const verifyObject = async (req, res, next) => {
    const {body} = req;
    if(
        !body.idObject
    ) {
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

    next();
};
module.exports = { verifyQR, verifyUser, verifyEmail, authenticateToken, validateToken, verifyObject};
