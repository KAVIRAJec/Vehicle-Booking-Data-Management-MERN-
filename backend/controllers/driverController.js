const Driver = require('../models/driverModel');
const VehicleDriver = require('../models/vehicle_driverModel');
const Vehicle = require('../models/vehicleModel');
const createError = require('../utils/appError');

//Driver Creation
exports.createDriver = async (req, res, next) => {
    try {
        const driver = await Driver.findOne({ name: req.body.name });

        if (driver) {
            return next(new createError('Driver Already exists!', 400));
        }

        const newDriver = await Driver.create({
            ...req.body,
        });

        res.status(201).json({
            status: 'success',
            message: 'Driver created Successfully',
            data: {
                newDriver,
            }
        });
    } catch (error) {
        next(error);
    }
};

//read individual Driver
exports.readDriver = async (req, res, next) => {
    try {
        const driver = await Driver.findOne({ name: req.body.name });

        if (!driver) {
            return next(new createError('Driver not found', 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Driver fetched Successfully',
            data: {
                driver,
            }
        });
    } catch (error) {
        next(error);
    }
}

//Read all Drivers
exports.readAllDriver = async (req, res, next) => {
    try {
        const drivers = await Driver.find();

        res.status(200).json({
            status: "success",
            message: 'Driver fetch Successfully',
            data: {
                drivers,
            }
        })
    } catch (error) {
        next(error);
    }
};

//edit Driver
exports.editDriver = async (req, res, next) => {
    try {
        const driver = await Driver.findOne({ name: req.body.name });

        if (!driver) {
            return next(new createError('Driver not found', 404));
        }

        const editedDriver = await Driver.findOneAndUpdate(
            { name: req.body.name },
            { ...req.body },
            { upsert: true, new: true, runValidators: true },
        );

        res.status(200).json({
            status: 'success',
            message: 'Driver edited successfully',
            data: {
                editedDriver,
            }
        });

    } catch (error) {
        next(error);
    }
}

//delete Driver
exports.deleteDriver = async (req, res, next) => {
    try {
        const { name } = req.body;

        const driver = await Driver.findOneAndDelete({ name });

        if (!driver) {
            return next(new createError('Driver not found', 404));
        }

        const vehicle_driver = await VehicleDriver.findOneAndDelete({ driver_name: driver.name });
        if (vehicle_driver) {
            const vehicle = await Vehicle.findOneAndUpdate(
                { unique_no: vehicle_driver.vehicle_unique_no },
                { mapped: false },
            );
        }
        console.log(vehicle_driver);
        res.status(200).json({
            status: 'success',
            message: 'Driver deleted successfully',
        });

    } catch (error) {
        next(error);
    }
}