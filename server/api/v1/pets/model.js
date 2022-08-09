const mongoose = require('mongoose');

const pet = {
  name: String,
  animal: String,
  breed: String,
  sex: String,
  age: String,
  description: String,
  size: String,
  color: String,
  trained: Boolean,
  vaccines: String,
  sterilized: Boolean,
};

module.exports = mongoose.model('pet', pet);
