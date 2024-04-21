const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    staff_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    dl: {
        type: String,
        required: true,
    },
    dl_no: {
        type: Number,
        required: true,
    },
    dl_exp: {
        type: Date,
        required: true,
    },
    dl_type: {
        type: String,
        required: true,
    },
    mapped: {
        type: Boolean,
        default: false,
    },
});

const Driver = mongoose.model('Driver',driverSchema);
module.exports = Driver;