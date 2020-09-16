const { Types, model, Schema } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: File,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Film', schema);