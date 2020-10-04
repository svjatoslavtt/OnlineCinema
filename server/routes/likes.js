const { Router } = require("express");
const Film = require("../models/Film");
const User = require("../models/User");

const router = Router();

router.post('/like/:filmId', async (req, res) => {
	try {
		const userId = req.body.id;

		// update film data
		const findFilm = await Film.findById(req.params.filmId);
		
		const newFilmData = {
			likes: findFilm.likes + 1,
			usersId: [...findFilm.usersId, userId],
		};

		const updateFilmData = await Film.findByIdAndUpdate(req.params.filmId, newFilmData, { new: true });

		await updateFilmData.save();

		const filmResponse = {
			likes: updateFilmData.likes,
			rating: updateFilmData.rating,
			id: updateFilmData._id,
			title: updateFilmData.title,
			description: updateFilmData.description,
			owner: updateFilmData.owner,
			image: updateFilmData.image,
		};

		// add film to my likes
		const findMyself = await User.findById(userId);

		const addFilmToMyLikes = {
			likes: [...findMyself.likes, updateFilmData._id],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, addFilmToMyLikes, { new: true });

		await updateMyData.save();

		return res.status(200).json({	isLike: updateFilmData.usersId.includes(userId), film: filmResponse });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/dislike/:filmId', async (req, res) => {
	try {
		const userId = req.body.id;

		// update film data
		const findFilm = await Film.findById(req.params.filmId);

		const filmUsersId = findFilm.usersId.filter(item => item.toString() !== userId);
		
		const newFilmData = {
			likes: findFilm.likes - 1,
			usersId: [...filmUsersId],
		};
		
		const updateFilmData = await Film.findByIdAndUpdate(req.params.filmId, newFilmData, { new: true });

		await updateFilmData.save();

		const filmResponse = {
			likes: updateFilmData.likes,
			rating: updateFilmData.rating,
			id: updateFilmData._id,
			title: updateFilmData.title,
			description: updateFilmData.description,
			owner: updateFilmData.owner,
			image: updateFilmData.image,
		};

		// delete film from my likes
		const findMyself = await User.findById(userId);

		const deleteFilmFromMyLikes = findMyself.likes.filter(item => item.toString() !== req.params.filmId);

		const myNewData = {
			likes: [...deleteFilmFromMyLikes],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, myNewData, { new: true });

		await updateMyData.save();

		const isLike = updateFilmData.usersId.includes(userId);

		return res.status(200).json({	isLike, film: filmResponse });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

module.exports = router;