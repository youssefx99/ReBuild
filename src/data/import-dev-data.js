const fs = require('fs');
const dotenv = require('dotenv');
const Tours = require('../models/tourModel');
const mongoose = require('mongoose');
const { json } = require('express');
const Tour = require('../models/tourModel');

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DataBase Connected Successsfully');
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importTours = async () => {
  try {
    await Tour.create(tours);
    console.log('tours json imported successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteTours = async () => {
  try {
    await Tour.deleteMany();
    console.log('tours data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importTours();
} else if (process.argv[2] === '--delete') {
  deleteTours();
}
