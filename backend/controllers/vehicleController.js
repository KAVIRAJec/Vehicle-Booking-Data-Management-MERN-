const Vehicle = require('../models/vehicleModel');
const VehicleDriver = require('../models/vehicle_driverModel');
const Driver = require('../models/driverModel');
const createError = require('../utils/appError');

//Vehicle Creation
exports.createVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findOne({ unique_no: req.body.unique_no });

        if (vehicle) {
            return next(new createError('Vehicle Already exists!', 400));
        }

        const newVehicle = await Vehicle.create({
            ...req.body,
        });

        res.status(201).json({
            status: 'success',
            message: 'Vehicle created Successfully',
            data: {
                newVehicle,
            }
        });
    } catch (error) {
        next(error);
    }
};

//read individual vehicle
exports.readVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findOne({ unique_no: req.body.unique_no });

        if (!vehicle) {
            return next(new createError('Vehicle not found', 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Vehicle fetched Successfully',
            data: {
                vehicle,
            }
        });
    } catch (error) {
        next(error);
    }
}

//Read all vehicle
exports.readAllVehicle = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();

        res.status(200).json({
            status: "success",
            message: 'Vehicle fetch Successfully',
            data: {
                vehicles,
            }
        })
    } catch (error) {
        next(error);
    }
};

//edit vehicle
exports.editVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findOne({ unique_no: req.body.unique_no });

        if (!vehicle) {
            return next(new createError('Vehicle not found', 404));
        }

        const editedVehicle = await Vehicle.findOneAndUpdate(
            { unique_no: req.body.unique_no },
            { ...req.body },
            { upsert: true, new: true, runValidators: true },
        );

        res.status(200).json({
            status: 'success',
            message: 'Vehicle edited successfully',
            data: {
                editedVehicle,
            }
        });

    } catch (error) {
        next(error);
    }
};

//delete Vehicle
exports.deleteVehicle = async (req, res, next) => {
    try {
        const { unique_no } = req.body;

        const vehicle = await Vehicle.findOneAndDelete({ unique_no });

        if (!vehicle) {
            return next(new createError('Vehicle not found', 404));
        }

        const vehicle_driver = await VehicleDriver.findOneAndDelete({ vehicle_unique_no: vehicle.unique_no });
        if (vehicle_driver) {
            const driver = await Driver.findOneAndUpdate(
                { name: vehicle_driver.driver_name },
                { mapped: false }
            );
        }

        res.status(200).json({
            status: 'success',
            message: 'Vehicle deleted successfully',
        });

    } catch (error) {
        next(error);
    }
}