const Tour = require('./../models/tourModel');
const APIFreatures = require('./../utils/APIFeatures');

exports.getTopTours = async (req, res, next) => {
  req.query.sort = 'price,-ratingAverage,ratingsQuantity';
  req.query.limit = '5';
  req.query.fields =
    'name,price,ratingAverage,ratingsQuantity,difficulty,summary';

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const feature = new APIFreatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await feature.query;

    res.status(200).json({
      status: 'success',
      lenght: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
