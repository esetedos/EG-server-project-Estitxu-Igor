const express = require('express')
const router = express.Router()

const searchController = require('../controllers/searchControllers')

const  middleware = require("../middlewares/middleware")

router.get('/', middleware.authenticateToken, searchController.getSearch)
router.patch("/", searchController.updateState)

module.exports = router;