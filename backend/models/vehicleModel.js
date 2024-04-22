const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicle_no: {
        type: String,
        required: true,
    },
    unique_no: {
        type: Number,
        required: true,
        unique: true,
    },
    vehicle_type: {
        type: String,
        required: true,
    },
    reg_date: {
        type: Date,
        required: true,
    },    
    road_tax: {
        type: String,
        required: true,
    },
    green_tax: {
        type: String,
        required: true,
    },
    permit: {
        type: String,
        required: true,
    },
    FC: {
        type: String,
        required: true,
    },
    PC: {
        type: String,
        required: true,
    },
    insurance: {
        type: String,
        required: true,
    },
    insurance_exp: {
        type: Date,
        required: true,
    },
    mapped: {
        type: Boolean,
        default: false,
    },
});

const Vehicle = mongoose.model('Vehicle',vehicleSchema);
module.exports = Vehicle;