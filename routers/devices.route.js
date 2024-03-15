const express = require('express')
const router = express.Router()

const devicesController = require("../controllers/devicesControllers")

router.get('/', devicesController.getDevice)
router.post('/create', devicesController.createDevice)
router.post('/update', devicesController.updateDevice)
router.delete('/delete/:id', devicesController.deleteDevice)

module.exports = router;