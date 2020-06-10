const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const techSchema = new Schema({
  name: { type: String, required: true },
  resources: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Resource' },
  ]
});

module.exports = mongoose.model('Tech', techSchema);


