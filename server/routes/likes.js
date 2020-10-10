const { Router } = require("express");
const Film = require("../models/Film");
const User = require("../models/User");
const isAuth = require("../middleware/auth.middleware");
const router = Router();

router.post('/like/:filmId', isAuth,  async (req, res) => {
	try {
		const userId = req.body.userId;

		// update film data
		const findFilm = await Film.findById(req.params.filmId);
		
		const newFilmData = {
			likes: findFilm.likes + 1,
			usersId: [...findFilm.usersId, userId],
		};

		const updateFilmData = await Film.findByIdAndUpdate(req.params.filmId, newFilmData, { new: true });

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

router.post('/dislike/:filmId', isAuth, async (req, res) => {
	try {
		const userId = req.body.userId;

		// update film data
		const findFilm = await Film.findById(req.params.filmId);

		const filmUsersId = findFilm.usersId.filter(item => item.toString() !== userId);
		
		const newFilmData = {
			likes: findFilm.likes - 1,
			usersId: [...filmUsersId],
		};
		
		const updateFilmData = await Film.findByIdAndUpdate(req.params.filmId, newFilmData, { new: true });
		await updateFilmData.save();

		// delete film from my likes
		const findMyself = await User.findById(userId);

		const deleteFilmFromMyLikes = findMyself.likes.filter(item => item.toString() !== req.params.filmId);

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