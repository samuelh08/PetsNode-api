const mongoose = require('mongoose');

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
};

const pet = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('pet', pet),
  fields,
};
