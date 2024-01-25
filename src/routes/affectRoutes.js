const express = require('express')
const router = express.Router()

const affectController = require('../controllers/affectControllers')

const  middleware = require("../middlewares/middleware")

router.get('/',  affectController.getAllAffects);


module.exports = router; 