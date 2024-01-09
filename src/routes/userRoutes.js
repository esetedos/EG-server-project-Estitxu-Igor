const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControllers')
const { verifyQR } = require('../services/userServices')

router.get('/', userController.getAllUsers)

router.post("/", userController.verifyUser)

router.post("/verifyQR", userController.verifyQR)

<<<<<<< HEAD
=======
router.patch("/", userController.updateUser)

router.get("/:name", userController.getOneUser)


>>>>>>> staging
module.exports = router;