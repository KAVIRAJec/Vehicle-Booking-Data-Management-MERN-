const Driver = require('../models/driverModel');
const Vehicle = require('../models/vehicleModel');
const VehicleDriver = require('../models/vehicle_driverModel');
const createError = require('../utils/appError');

//Vehicle Driver Creation
exports.createMapping = async (req,res,next) => {
    try{
        const { vehicle_unique_no, driver_name } = req.body;

        //check if vehicle exists
        const vehicle = await Vehicle.findOne({unique_no: vehicle_unique_no });
        if(!vehicle){
            return next(new createError('Vehicle not found!',404));
        }

        //check if driver exists
        const driver = await Driver.findOne({name: driver_name });
        if(!driver){
            return next(new createError('Driver not found!',404));
        }

        //check if mapping already exists
        const vehicleMapping = await VehicleDriver.findOne({vehicle_unique_no });
        if(vehicleMapping){
            return next(new createError('Vehicle is already mapped with another driver',400));
        }
        const driverMapping = await VehicleDriver.findOne({driver_name });
        if(driverMapping){
            return next(new createError('Driver is already mapped with another vehicle',400));
        }

        const newMapping = await VehicleDriver.create({
            vehicle_unique_no,
            driver_name,
        });

        await Vehicle.updateOne({unique_no: vehicle_unique_no}, {mapped: true});
        await Driver.updateOne({name: driver_name}, {mapped: true});

        res.status(201).json({
            status: 'success',
            message: 'Mapping established Successfully',
            data: {
                newMapping,
            }
        });
    }catch (error) {
        next(error);
    }
};

//Read Individual Mapping
exports.readMapping = async (req,res,next) => {
    try{
        const { vehicle_unique_no, driver_name } = req.body;

        const mapping = await VehicleDriver.findOne({vehicle_unique_no});

        if(!mapping){
            return next(new createError('Mapping not found',404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Mapping fetched Successfully',
            data: {
                mapping,
            }
        });
    }catch (error) {
        next(error);
    }
};

//Read Individual Mapping
// exports.readMapping = async (req,res,next) => {
//     try{
//         const { vehicle_unique_no, driver_name } = req.body;

//         const mapping = await VehicleDriver.findOne({driver_name});

//         if(!mapping){
//             return next(new createError('Mapping not found',404));
//         }

//         res.status(200).json({
//             status: 'success',
//             message: 'Mapping fetched Successfully',
//             data: {
//                 mapping,
//             }
//         });
//     }catch (error) {
//         next(error);
//     }
// };

//Read all Mapping
exports.readAllMapping = async (req, res, next) => {
    try {
        const mappings = await VehicleDriver.find();

        res.status(200).json({
            status: 'success',
            message: 'Mappings fetched Successfully',
            data: {
                mappings,
            }
        });
    }catch (error){
        next(error);
    }
}

//Read available Mapping
exports.readAvailableMapping = async (req, res, next) => {
    try {
        const mappings = await VehicleDriver.find({ is_available: true });

        res.status(200).json({
            status: 'success',
            message: 'Mappings fetched Successfully',
            data: {
                mappings,
            }
        });
    }catch (error){
        next(error);
    }
}

//Edit Driver Mapping
exports.editDriverMapping = async ( req, res, next ) => {
    try{
        const { vehicle_unique_no, driver_name } = req.body;

        const currentMapping = await VehicleDriver.findOne({
            vehicle_unique_no
        });

        if(!currentMapping){
            return next(new createError('Mapping not found for Vehicle',404));
        }

        //check if new driver exist
        const newDriver = await Driver.findOne({
            name: driver_name
        });
        if(!newDriver){
            return next(new createError('Driver not found',404));
        }

        //check if new driver already mapped
        const MappingDriver = await VehicleDriver.findOne({
            driver_name: req.body.driver_name
        });
        if(MappingDriver){
            return next(new createError('Driver is already mapped with another vehicle',400));
        }
        const prevData = await VehicleDriver.findOne({
            vehicle_unique_no
        });
        const prevDriver = prevData.driver_name;

        const updatedMapping = await VehicleDriver.findOneAndUpdate(
            { vehicle_unique_no: req.body.vehicle_unique_no },
            { driver_name: req.body.driver_name },
            { upsert: true, new: true, runValidators: true },
        );

        await Driver.updateOne({name: prevDriver}, {mapped: false});
        await Driver.updateOne({name: driver_name}, {mapped: true});

        res.status(200).json({
            status: 'success',
            message: 'Driver Changed Successfully',
            data: {
                updatedMapping,
            }
        });
    }catch(error){
        next(error);
    }
};

//Edit Vehicle Mapping
exports.editVehicleMapping = async ( req, res, next ) => {
    try{
        const { vehicle_unique_no, driver_name } = req.body;

        const currentMapping = await VehicleDriver.findOne({
            driver_name,
        });

        if(!currentMapping){
            return next(new createError('Mapping not found for Driver',404));
        }

        //check if new vehicle exist
        const newVehicle = await Vehicle.findOne({
            unique_no: vehicle_unique_no
        });
        if(!newVehicle){
            return next(new createError('Vehicle not found',404));
        }

        //check if new Vehicle already mapped
        const MappingVehicle = await VehicleDriver.findOne({
            vehicle_unique_no: req.body.vehicle_unique_no
        });
        if(MappingVehicle){
            return next(new createError('Vehicle is already mapped with another Driver',400));
        }
        const prevData = await VehicleDriver.findOne({
            driver_name,
        });
        const prevVehicle = prevData.vehicle_unique_no;

        const updatedMapping = await VehicleDriver.findOneAndUpdate(
            { driver_name: req.body.driver_name },
            { vehicle_unique_no: req.body.vehicle_unique_no },            
            { upsert: true, new: true, runValidators: true },
        );

        await Vehicle.updateOne({unique_no: prevVehicle}, {mapped: false});
        await Vehicle.updateOne({unique_no: vehicle_unique_no}, {mapped: true});

        res.status(200).json({
            status: 'success',
            message: 'Driver Changed Successfully',
            data: {
                updatedMapping,
            }
        });
    }catch(error){
        next(error);
    }
};

//Delete Mapping
exports.deleteMapping = async (req,res,next) => {
    try {
        const { vehicle_unique_no, driver_name } = req.body;

        const mapping = await VehicleDriver.findOneAndDelete({ vehicle_unique_no, driver_name });

        if(!mapping){
            return next(new createError('Mapping not found',404));
        }

        await Vehicle.updateOne({unique_no: vehicle_unique_no}, {mapped: false});
        await Driver.updateOne({name: driver_name}, {mapped: false});

        res.status(200).json({
            status: 'success',
            message: 'Mapping Deleted Successfully',            
        });
    } catch (error) {
        next(error);
    }
}