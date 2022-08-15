const mongoose = require('mongoose');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
  answer: {
    type: Boolean,
    required: true,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  applicationId: {
    type: Schema.Types.ObjectId,
    ref: 'application',
    required: true,
  },
};

const application = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

const sanitizers = [body('message').escape()];

module.exports = {
  Model: mongoose.model('application', application),
  fields,
  references,
  sanitizers,
};
