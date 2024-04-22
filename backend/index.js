const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const vehicleRouter = require('./routes/vehicleRoute');
const driverRouter = require('./routes/driverRoute');
const vehicle_driverRouter = require('./routes/vehicle_driverRoute');
const bookingRouter = require('./routes/bookingRoute');
const app = express();
const env = require('dotenv');
env.config();

// 1)Middleware
app.use(cors());
app.use(express.json());

// 2)Routes
app.use('/api/auth',authRouter);
app.use('/vehicle',vehicleRouter);
app.use('/driver',driverRouter);
app.use('/vehicle_driver',vehicle_driverRouter);
app.use('/booking',bookingRouter);

// 3)Mongo DB Connection
const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl)
.then(()=> console.log("Connected to the database"))
.catch((error) => console.error("Failed to connect to MongoDB:", error));

// 4)Global Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// 5)Server
const port = 3005;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})