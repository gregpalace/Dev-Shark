const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resources: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Resource' },
  ],
});

module.exports = mongoose.model('User', userSchema);
