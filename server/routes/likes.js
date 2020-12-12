const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");
const isAuth = require("../middleware/auth.middleware");
const router = Router();

router.post('/like/:bookId', isAuth,  async (req, res) => {
	try {
		const userId = req.body.userId;

		// update book data
		const findBook = await Book.findById(req.params.bookId);
		
		const newBookData = {
			likes: findBook.likes + 1,
			usersId: [...findBook.usersId, userId],
		};

		const updateBookData = await Book.findByIdAndUpdate(req.params.bookId, newBookData, { new: true });

		await updateBookData.save();

		// add book to my likes
		const findMyself = await User.findById(userId);

		const addBookToMyLikes = {
			likes: [...findMyself.likes, updateBookData._id],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, addBookToMyLikes, { new: true });
		await updateMyData.save();

		const isLike = updateBookData.usersId.includes(userId);

		return res.status(200).json({	isLike, likes: updateBookData.likes });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/dislike/:bookId', isAuth, async (req, res) => {
	try {
		const userId = req.body.userId;

		// update book data
		const findBook = await Book.findById(req.params.bookId);

		const bookUsersId = findBook.usersId.filter(item => item.toString() !== userId);
		
		const newBookData = {
			likes: findBook.likes - 1,
			usersId: [...bookUsersId],
		};
		
		const updateBookData = await Book.findByIdAndUpdate(req.params.bookId, newBookData, { new: true });
		await updateBookData.save();

		// delete book from my likes
		const findMyself = await User.findById(userId);

		const deleteBookFromMyLikes = findMyself.likes.filter(item => item.toString() !== req.params.bookId);

		const myNewData = {
			likes: [...deleteBookFromMyLikes],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, myNewData, { new: true });

		await updateMyData.save();

		const isLike = updateBookData.usersId.includes(userId);

		return res.status(200).json({	isLike, likes: updateBookData.likes });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;