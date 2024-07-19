const express = require('express');
const VehicleDriverController = require('../controllers/vehicle_driverController');

const router = express.Router();

router.post('/create',VehicleDriverController.createMapping);
router.post('/read',VehicleDriverController.readMapping);
router.post('/readAll',VehicleDriverController.readAllMapping);
router.post('/readAvailable',VehicleDriverController.readAvailableMapping);
router.patch('/updateDriver',VehicleDriverController.editDriverMapping);
router.patch('/updateVehicle',VehicleDriverController.editVehicleMapping);
router.delete('/delete',VehicleDriverController.deleteMapping);

module.exports = router;