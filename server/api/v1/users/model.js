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

const user = new Schema(Object.assign(fields), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

user
  .virtual('name')
  .get(function getName() {
    return `${this.firstname} ${this.lastname}`;
  })
  .set(function setName(name) {
    const [firstname = '', lastname = ''] = name.split(' ');
    this.firstname = firstname;
    this.lastname = lastname;
  });

const hiddenFields = ['password'];

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  hiddenFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
