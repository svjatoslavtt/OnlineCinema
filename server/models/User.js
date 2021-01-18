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
	saveForLater: [
		{
			type: Types.ObjectId,
			ref: 'Book',
		},
	],
});

module.exports = model('User', schema);