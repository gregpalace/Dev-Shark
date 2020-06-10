const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // reference comment model
      ref: 'Comment',
    },
  ],
  techId: { type: mongoose.Types.ObjectId, required: true, ref: 'Tech' }
});

module.exports = mongoose.model('Resource', resourceSchema);
