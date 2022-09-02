const mongoose = require('mongoose');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  animal: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  sex: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
    maxlength: 280,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  trained: {
    type: Boolean,
    required: true,
    default: false,
  },
  vaccinated: {
    type: Boolean,
    required: true,
    default: false,
  },
  sterilized: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: 'Available',
  },
  picture: {
    type: String,
    required: true,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const pet = new Schema(Object.assign(fields, references), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const virtuals = {
  applications: {
    ref: 'application',
    localField: '_id',
    foreignField: 'petId',
  },
  applicationsCount: {
    ref: 'application',
    localField: '_id',
    foreignField: 'petId',
    count: true,
  },
};

pet.virtual('applications', virtuals.applications);
pet.virtual('applicationsCount', virtuals.applicationsCount);

const sanitizers = [
  body('name').escape(),
  body('animal').escape(),
  body('breed').escape(),
  body('sex').escape(),
  body('age').escape(),
  body('description').escape(),
  body('size').escape(),
  body('color').escape(),
  body('trained').toBoolean(),
  body('vaccinated').toBoolean(),
  body('esterilized').toBoolean(),
];

module.exports = {
  Model: mongoose.model('pet', pet),
  fields,
  references,
  virtuals,
  sanitizers,
};
