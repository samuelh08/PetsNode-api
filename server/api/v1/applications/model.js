const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 280,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  petId: {
    type: Schema.Types.ObjectId,
    ref: 'pet',
    required: true,
  },
};

const application = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

const virtuals = {
  applications: {
    ref: 'reply',
    localField: '_id',
    foreignField: 'applicationId',
  },
};

application.virtual('reply', virtuals.reply);

module.exports = {
  Model: mongoose.model('application', application),
  fields,
  references,
  virtuals,
};
