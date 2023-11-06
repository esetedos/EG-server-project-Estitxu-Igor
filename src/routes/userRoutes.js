const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControllers')
const { verifyQR } = require('../services/userServices')

router.get('/', userController.getAllUsers)

router.post("/", userController.verifyUser)

router.post("/verifyQR", userController.verifyQR)

module.exports = router;