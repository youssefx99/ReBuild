const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AppError = require('./src/utils/appError');
const globalErrorHandeler = require('./src/controllers/errorController');
const tourRouter = require('./src/routes/tourRoutes');
const app = express();
dotenv.config();

const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log('Database Connected Successfully');
});

app.use(express.json());

app.use((req, res, next) => {
  console.log('Welcome to the system');
  next();
});

app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandeler);

module.exports = app;
