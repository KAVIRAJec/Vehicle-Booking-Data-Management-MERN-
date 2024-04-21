const mongoose = require('mongoose');

const vehicleDriverSchema = new mongoose.Schema({
    vehicle_unique_no: {
        type: Number,
        required: true,
        ref: 'Vehicle',
    },
    driver_name: {
        type: String,
        required: true,
        ref: 'Driver',
    },
});

const VehicleDriver = mongoose.model('VehicleDriver', vehicleDriverSchema);
module.exports = VehicleDriver;