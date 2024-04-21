const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

router.post('/create',vehicleController.createVehicle);
router.post('/read',vehicleController.readVehicle);
router.post('/readAll',vehicleController.readAllVehicle);
router.patch('/update',vehicleController.editVehicle);
router.delete('/delete',vehicleController.deleteVehicle);

module.exports = router;