const mongoose = require('mongoose');
const { hashPassword } = require('../helper/hash');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
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
  },
  type: {
    type: String,
    enum : ['EXTERNAL','INTERNAL'],
    default: 'EXTERNAL'
  },
  preferences: [String],
  date_of_birth: {
    type: Date,
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

userSchema.pre('save', function (next) {
  this.avatar = `https://avatars.dicebear.com/api/miniavs/${this.username}.svg`;

  this.password = hashPassword(this.password);

  next();
});

module.exports = mongoose.model('User', userSchema);
