const express = require('express')
const router = express.Router()

const artifactController = require('../controllers/artifactControllers')

router.get('/', artifactController.getAllArtifacts)
router.get("/:name", artifactController.getOneArtifact)
router.patch("/", artifactController.updateArtifact)

module.exports = router;