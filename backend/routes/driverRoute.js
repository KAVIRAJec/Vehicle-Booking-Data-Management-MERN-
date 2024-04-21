const express = require('express');
const driverController = require('../controllers/driverController');

const router = express.Router();

router.post('/create',driverController.createDriver);
router.post('/read',driverController.readDriver);
router.post('/readAll',driverController.readAllDriver);
router.patch('/update',driverController.editDriver);
router.delete('/delete',driverController.deleteDriver);

module.exports = router;