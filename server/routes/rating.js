const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");
const isAuth = require("../middleware/auth.middleware");
const router = Router();

router.post('/:bookId', isAuth,  async (req, res) => {
	try {
		const userId = req.body.userId;
		const rating = req.body.rating;

		// update book data
		const findBook = await Book.findById(req.params.bookId);

		const averageRating = ((findBook.rating + rating) / (findBook.ratingUsersId.length + 1)).toFixed(1);
		
		const newBookData = {
			rating: findBook.rating + rating,
			averageRating,
			ratingUsersId: [...findBook.ratingUsersId, { userId, rating }],
		};

		const updateBookData = await Book.findByIdAndUpdate(req.params.bookId, newBookData, { new: true });

		await updateBookData.save();

		const ratingResponse = {
			rating: updateBookData.rating,
			ratingUsersId: updateBookData.ratingUsersId.length,
			peopleRated: updateBookData.ratingUsersId.length,
			averageRating: updateBookData.averageRating,
		};

		// add book to my ratings
		const findMyself = await User.findById(userId);

		const addBookToMyRatings = {
			ratings: [...findMyself.ratings, updateBookData._id],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, addBookToMyRatings, { new: true });

		await updateMyData.save();
	
		const isRate = updateBookData.ratingUsersId.some(item => item.userId.toString() === userId);

		return res.status(200).json({	isRate, rating: ratingResponse });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;