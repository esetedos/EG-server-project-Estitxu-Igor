const express = require('express')
const router = express.Router()

const objectController = require('../controllers/objectControllers')

const  middleware = require("../middlewares/middleware")

router.get('/', objectController.getAllObjects)

router.post('/opened', objectController.openRetrieval)

module.exports = router;