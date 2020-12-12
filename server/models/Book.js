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
	director: {
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
	usersId: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
	rating: {
		type: Number,
		default: 0,
	},
	averageRating: {
		type: Number,
		default: 0,
	},
	ratingUsersId: [
		{
			userId: {
				type: Types.ObjectId,
				ref: 'User'
			},
			rating: {
				type: Number,
				required: true,
			},
		}
	],
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Book', schema);