const express = require('express')
const router = express.Router()

const searchController = require('../controllers/searchControllers')

router.get('/', searchController.getSearch)
router.patch("/", searchController.updateState)

module.exports = router;