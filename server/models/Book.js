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
	author: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	publishingHouse: {
		type: String,
	},
	isbn: {
		type: String,
		required: true,
	},
	article: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	yearOfPublish: {
		type: Number,
		required: true,
	},
	binding: {
		type: String,
		required: true,
	},
	pages: {
		type: Number,
		required: true,
	},
	format: {
		type: String,
		required: true,
	},
	weight: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	discountPrice: {
		type: Number,
	},
	discountPercent: {
		type: Number,
	},
  file: {
    type: String,
    required: true,
  },
	reviews: [
		{
			userId: {
				type: Types.ObjectId,
				ref: 'User',
			},
			number: {
				type: Number,
				default: 0,
			}
		},
	],
	averageRating: {
		type: Number,
		default: 0,
	},
	date: {
    type: Number,
    required: true,
  },
});

module.exports = model('Book', schema);