const mongoose = require('mongoose');
const { isEmail } = require('validator');

const donateSchema = new mongoose.Schema({
  name: String,
  book_title: String,
  book_author: String,
  weight: Number,
  book_image_url: String,
  remarks_desc: String,
  preferred_donation_option: String,
  book_category: String
})

const requestSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
  email: {
    type: String,
    validate: [isEmail, 'Invalid Email'],
  },
  preferred_receiving_option: String,
  pick_up_time: Date,
  remarks_desc: String,
  book_category: String,
  book_title: String,
  book_author: String,
  book_image_url: String,
})

const collectionSchema = new mongoose.Schema({
  action_type: {
    type: String,
    enum : ['DONATION','REQUEST'],
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum : ['PENDING','IN-PROCESS','DONE'],
    required: true,
    default: 'PENDING'
  },
  donate_properties: donateSchema,
  request_properties: requestSchema,
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
  updated_at: {
    type: Date,
    default: new Date().toISOString(),
  }
});

module.exports = mongoose.model('Collection', collectionSchema);
