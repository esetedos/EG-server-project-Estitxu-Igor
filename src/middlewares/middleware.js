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



const JWTVerify = async (req, res, next) => {
    const {header} = req;
    
}