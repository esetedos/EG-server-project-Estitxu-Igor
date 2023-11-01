const express = require('express')
const router = express.Router()

const ingredientController = require('../controllers/ingredientControllers')

router.get('/', ingredientController.getAllIngredients)

module.exports = router;