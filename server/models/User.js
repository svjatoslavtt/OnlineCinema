const { model, Schema, Types } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  films: [
    {
      type: Types.ObjectId,
      ref: 'Book',
    },
	],
	likes: [
		{
			type: Types.ObjectId,
			ref: 'Book',
		},
	],
	ratings: [
		{
			type: Types.ObjectId,
			ref: 'Book',
		},
	],
});

module.exports = model('User', schema);