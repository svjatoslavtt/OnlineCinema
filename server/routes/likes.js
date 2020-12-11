const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");
const isAuth = require("../middleware/auth.middleware");
const router = Router();

router.post('/like/:bookId', isAuth,  async (req, res) => {
	try {
		const userId = req.body.userId;

		// update film data
		const findFilm = await Book.findById(req.params.bookId);
		
		const newFilmData = {
			likes: findFilm.likes + 1,
			usersId: [...findFilm.usersId, userId],
		};

		const updateFilmData = await Book.findByIdAndUpdate(req.params.bookId, newFilmData, { new: true });

		await updateFilmData.save();

		// add film to my likes
		const findMyself = await User.findById(userId);

		const addFilmToMyLikes = {
			likes: [...findMyself.likes, updateFilmData._id],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, addFilmToMyLikes, { new: true });
		await updateMyData.save();

		const isLike = updateFilmData.usersId.includes(userId);

		return res.status(200).json({	isLike, likes: updateFilmData.likes });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/dislike/:bookId', isAuth, async (req, res) => {
	try {
		const userId = req.body.userId;

		// update film data
		const findFilm = await Book.findById(req.params.bookId);

		const filmUsersId = findFilm.usersId.filter(item => item.toString() !== userId);
		
		const newFilmData = {
			likes: findFilm.likes - 1,
			usersId: [...filmUsersId],
		};
		
		const updateFilmData = await Book.findByIdAndUpdate(req.params.bookId, newFilmData, { new: true });
		await updateFilmData.save();

		// delete film from my likes
		const findMyself = await User.findById(userId);

		const deleteFilmFromMyLikes = findMyself.likes.filter(item => item.toString() !== req.params.bookId);

		const myNewData = {
			likes: [...deleteFilmFromMyLikes],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, myNewData, { new: true });

		await updateMyData.save();

		const isLike = updateFilmData.usersId.includes(userId);

		return res.status(200).json({	isLike, likes: updateFilmData.likes });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;