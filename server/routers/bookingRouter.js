const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController')

router.get('/getAllBookings', BookingController.getAllBookings);
router.post('/createBooking', BookingController.createBooking);
router.put('/updateBooking', BookingController.updateBooking);

module.exports = router