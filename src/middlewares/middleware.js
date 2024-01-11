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






const authenticateToken = (req, res, next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]
   if(!token) {
       console.log("UNAUTHORIZED")
       return res.sendStatus(401)
   }

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, email) => {
       if(error) {
           console.log("FORBIDDEN")
           console.log(error)
           return res.sendStatus(403)
       }

       req.email = email
       next()
   })
}

const veryfyEmail = async (req, res, next) => {
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

const validateToken = (req, res, next) => {
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
 
        req.email = email
        next()
    })
 }



module.exports = { verifyQR, verifyUser, veryfyEmail, authenticateToken, validateToken};
