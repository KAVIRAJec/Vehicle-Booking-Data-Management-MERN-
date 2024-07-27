const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const createError = require('../utils/appError');
const VehicleDriver = require('../models/vehicle_driverModel');
const nodeSchedule = require('node-schedule');

//Booking Creation
exports.createBooking = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new createError('User not found', 404));
        }

        const startTime = moment(req.body.start_time);
        const returnTime = moment(req.body.return_time);
        if (!returnTime.isAfter(startTime)) {
            return next(new createError('Return date must be after start date', 400));
        }

        const bookingDate = moment(req.body.start_time);
        const currentDate = moment();
        if (bookingDate.isBefore(currentDate, 'day')) {
            return next(new createError('Booking date must be in the upcoming dates', 400));
        }

        const existingBooking = await Booking.findOne({
            id: user.id,
            $or: [
                { start_time: { $lte: req.body.return_time }, return_time: { $gte: req.body.start_time } },
                { start_time: { $gte: req.body.start_time, $lte: req.body.return_time } }
            ]
        });

        if (existingBooking) {
            return next(new createError('A booking already exists for this time slot', 400));
        }

        const uuid = uuidv4();
        const shortId = uuid.replace(/-/g, '').substring(0, 5);
        const booking_id = shortId;

        const newBooking = await Booking.create({
            ...req.body,
            booking_id: booking_id,
            id: user.id,
            contact: user.contact,
            name: user.name,
        });

        res.status(201).json({
            status: 'success',
            message: 'Vehicle Booking submitted Successfully',
            data: {
                newBooking,
            }
        });
    } catch (error) {
        next(error);
    }
};

//Read individual booking
exports.readBooking = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new createError('User not Found', 404));
        }

        const booking = await Booking.find({ id: user.id });

        res.status(200).json({
            status: 'success',
            message: 'Booking fetched Successfully',
            data: {
                booking,
            }
        });
    } catch (error) {
        next(error);
    }
}

//Read all Booking
exports.readAllBooking = async (req, res, next) => {
    try {
        const bookings = await Booking.find();

        res.status(200).json({
            status: "success",
            message: 'Booking fetch Successfully',
            data: {
                bookings,
            }
        })
    } catch (error) {
        next(error);
    }
};

//Edit Booking
exports.editBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findOne({ booking_id: req.body.booking_id });

        if (!booking) {
            return next(new createError('Booking not found', 404));
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new createError('User not found', 404));
        }

        if (user.role !== 'admin') {
            return next(new createError('You are not Admin to change Access', 404));
        }

        const { status, remarks } = req.body;

        if (status !== 'approved' && status !== 'rejected') {
            return next(new createError('Invalid status. Status should be either approved or declined', 400));
        }

        if (status === 'rejected' && !remarks) {
            return next(new createError('Remarks are required when status is declined', 400));
        }

        if (status === 'approved' && remarks) {
            return next(new createError('Remarks are not required for approved status', 400));
        }

        const { _id } = req.body;
        const availability = await VehicleDriver.findOne({ _id });
        if (status === 'approved' && !availability) {
            return next(new createError('VehicleDriver not found', 404));
        }
        if (status === 'approved' && availability.is_available === false) {
            return next(new createError('VehicleDriver is not available', 404));
        }

        const availableUpdate = await VehicleDriver.findOneAndUpdate({ _id: _id }, { $set: { is_available: false } });
        let remarksObject;
        if (status === 'approved' && !availableUpdate) {
            return next(new createError('Error while assigning vehicle', 404));
            remarksObject = `Vehicle: ${availableUpdate.vehicle_unique_no}, Driver: ${availableUpdate.driver_name}`;
        }

        let updatedBooking = null;

        if (status === 'rejected') {
            updatedBooking = await Booking.findOneAndUpdate(
                { booking_id: req.body.booking_id },
                {
                    status: req.body.status,
                    remarks: remarks,
                },
                { upsert: true, new: true, runValidators: true },
            );
        }
        if(status === 'approved') {
        updatedBooking = await Booking.findOneAndUpdate(
            { booking_id: req.body.booking_id },
            {
                status: req.body.status,
                remarks: remarksObject,
            },
            { upsert: true, new: true, runValidators: true },
        );
    }

        const returnTime = new Date(updatedBooking.return_time);
        nodeSchedule.scheduleJob(returnTime, async function () {
            try {
                await VehicleDriver.findOneAndUpdate({ _id: _id }, { $set: { is_available: true } });
                console.log('VehicleDriver availability updated to true');
            } catch (error) {
                console.error('Failed to update VehicleDriver availability:', error);
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Booking updated & Assigned Successfully',
            data: {
                updatedBooking,
            }
        });
    } catch (error) {
        next(error);
    }
};

//Delete Booking
exports.deleteBooking = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new createError('User not found', 404));
        }

        if (user.role !== 'admin') {
            return next(new createError('You are not Admin to change Access', 404));
        }

        const booking = await Booking.findOneAndDelete({ booking_id: req.body.booking_id });

        if (!booking) {
            return next(new createError('Booking not found', 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Booking deleted Successfully',
        });
    } catch (error) {
        next(error);
    }
};