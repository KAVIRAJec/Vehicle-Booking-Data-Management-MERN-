const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.post('/create',bookingController.createBooking);
router.post('/read',bookingController.readBooking);
router.post('/readAll',bookingController.readAllBooking);
router.patch('/update',bookingController.editBooking);
router.delete('/delete',bookingController.deleteBooking);

module.exports = router;