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
      ref: 'Film',
    },
	],
	likes: [
		{
			type: Types.ObjectId,
			ref: 'Film',
		},
	],
	ratings: [
		{
			type: Types.ObjectId,
			ref: 'Film',
		},
	],
});

module.exports = model('User', schema);