const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    maxlength: 64,
  },
  document: {
    type: String,
    required: true,
    trim: true,
  },
  documentType: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
};

const pet = new Schema(Object.assign(fields), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('pet', pet),
  fields,
};
