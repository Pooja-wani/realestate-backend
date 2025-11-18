const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  fullname: String,
  email: String,
  mobile: String,
  city: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
