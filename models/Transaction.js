const mongoose = require('mongoose');
const { hashPassword } = require('../helper/hash');
const { isEmail } = require('validator');

const transactionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  type: {
    type: String,
    enum : ['EXTERNAL','INTERNAL'],
    default: 'EXTERNAL'
},
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
  updated_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});


module.exports = mongoose.model('Transaction', transactionSchema);
