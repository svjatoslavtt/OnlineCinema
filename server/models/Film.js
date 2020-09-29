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
    type: String,
    required: true,
  },
  likes: {
		type: Number,
		default: 0,
    required: true,
	},
	rating: {
		type: Number,
		default: 0,
		required: true,
	},
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Film', schema);