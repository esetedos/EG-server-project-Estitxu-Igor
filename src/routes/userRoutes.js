const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControllers')
const { verifyQR } = require('../services/userServices')

const  middleware = require("../middlewares/middleware")

router.get('/', userController.getAllUsers)

router.post("/", middleware.verifyUser, userController.verifyUser)

router.post("/verifyQR", userController.verifyQR)

router.patch("/", userController.updateUser)

router.get("/:name", middleware.authenticateToken, userController.getOneUser)

router.post("/JWT", middleware.verifyEmail, userController.getEmailJWT)

router.post("/refresh", middleware.validateToken, userController.getEmailJWT)

router.post("/inventory", middleware.verifyEmail, middleware.verifyObject, userController.verifyObject)


module.exports = router;