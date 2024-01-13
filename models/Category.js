const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    unique: true
  }
});


module.exports = mongoose.model('Category', categorySchema);
