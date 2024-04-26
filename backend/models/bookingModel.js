const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    booking_id: {
        type: String,
        required: true,
        unique: true,
    },
    vehicle_type: {
        type: String,
        required: true,
    },
    people: {
        type: Number,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    start_time: {
        type: Date,
        required: true,
    },
    return_time: {
        type: Date,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    remarks: {
        type: String,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;