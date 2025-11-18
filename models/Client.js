const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String },
  review: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
