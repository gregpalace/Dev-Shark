const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  // add a date
  date: { type: Number, required: true }
  // FIX AUTHOR LATER to TIE IN WITH USER MODEL!!!!
  // author: { type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
