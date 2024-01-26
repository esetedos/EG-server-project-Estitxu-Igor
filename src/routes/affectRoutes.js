const express = require('express')
const router = express.Router()

const affectController = require('../controllers/affectControllers')

const  middleware = require("../middlewares/middleware")

router.get('/',  middleware.verifyEmail, affectController.getAllAffects);


module.exports = router; 