const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const createError = require('../utils/appError');
//REGISTER USER
exports.signup = async (req,res,next) => {
    try{
        const user = await User.findOne({ email: req.body.email });

        if(user){
            return next(new createError('User already exists!',400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        //Assign JWT (json web token) to user
        const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: '6h',
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered Successfully',
            token,
            user:{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                
            },
        });
    } catch (error) {
        next(error);
    }
};

// LOGGING USER
exports.login = async (req,res,next) => {
    try{
        const { email, password} = req.body;

        const user = await User.findOne({ email });

        if(!user) return next(new createError('User not found',404));

        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if(!isPasswordValid){
            return next(new createError('Invalid Email or Password',401));
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '6h',
        });

        res.status(200).json({
            status: 'success',
            token,
            message: 'Logged in successfully',
            user:{
                _id: user._id,
                id: user.id,
                name: user.name,
                contact: user.contact,
                email: user.email,
                role: user.role,

            }
        });
    }catch (error){
        next(error);
    }
};

// EDIT USER
exports.edit = async (req,res,next) => {
    try{
        const { name, id, contact, email } = req.body;

        const user = await User.findOne({ email });

        if(!user) return next(new createError('User not found',404));

        const EditedUser = await User.findOneAndUpdate(
            { email: email },
            { name: name, id: id, contact: contact },
            { upsert: true, new: true, runValidators: true },
        );
    
        const token = jwt.sign({ _id: EditedUser._id }, process.env.SECRET_KEY, {
            expiresIn: '6h',
        });
    
        res.status(200).json({
            status: 'success',
            token,
            message: 'Data Edited successfully',
            user:{
                _id: user._id,
                id: user.id,
                name: user.name,
                contact: user.contact,
                email: user.email,
                role: user.role,
            }
        });
    }catch (error){
        next(error);
    }
};