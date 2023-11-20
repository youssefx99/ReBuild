const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxLength: [50, 'a tour name must not exceed 50 charaters'],
      minLength: [3, 'a tour name must not below than 10 charaters'],
      //   validate: [validator.isAlpha, 'the tour name must only contain letters'],
    },
    slug: String,
    price: {
      type: Number,
      require: [true, 'tour must have price'],
      max: [20000, 'the max price for a tour must not exeed 20000'],
      min: [200, 'the tour price must not below than 200'],
    },
    priceDiscount: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: 'Discount price must be smaller than the tour price',
      },
    },
    duration: {
      type: Number,
      required: [true, 'the tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'the tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'the tour must a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'the tour diffcult must only be easy, medium or diffcult',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      max: [5, 'the tour rating must not exceed 5.0 stars'],
      min: [1, 'the tour rating must not be below than 1.0 star'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      require: true,
      trim: [true, 'the tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'the tour must have image cover'],
    },
    images: [String],
    CreatedAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleWare
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query middleWare
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema, 'tours');
module.exports = Tour;
