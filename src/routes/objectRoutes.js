const express = require('express')
const router = express.Router()

const objectController = require('../controllers/objectControllers')

const  middleware = require("../middlewares/middleware")

router.get('/', middleware.authenticateToken, objectController.getAllObjects)

router.post('/opened', middleware.verifyObject, objectController.openRetrieval)

module.exports = router;