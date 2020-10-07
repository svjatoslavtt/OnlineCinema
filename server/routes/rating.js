const { Router } = require("express");
const Film = require("../models/Film");
const User = require("../models/User");
const isAuth = require("../middleware/auth.middleware");
const router = Router();

router.post('/:filmId', isAuth,  async (req, res) => {
	try {
		const userId = req.body.userId;
		const rating = req.body.rating;

		// update film data
		const findFilm = await Film.findById(req.params.filmId);

		const averageRating = ((findFilm.rating + rating) / (findFilm.ratingUsersId.length + 1)).toFixed(1);
		
		const newFilmData = {
			rating: findFilm.rating + rating,
			averageRating,
			ratingUsersId: [...findFilm.ratingUsersId, { userId, rating }],
		};

		const updateFilmData = await Film.findByIdAndUpdate(req.params.filmId, newFilmData, { new: true });

		await updateFilmData.save();

		const filmResponse = {
			likes: updateFilmData.likes,
			rating: updateFilmData.rating,
			ratingUsersId: updateFilmData.ratingUsersId.length,
			id: updateFilmData._id,
			title: updateFilmData.title,
			description: updateFilmData.description,
			owner: updateFilmData.owner,
			image: updateFilmData.image,
			director: updateFilmData.director,
			averageRating: updateFilmData.averageRating,	
			peopleRated: updateFilmData.ratingUsersId.length,
		};

		// add film to my ratings
		const findMyself = await User.findById(userId);

		const addFilmToMyRatings = {
			ratings: [...findMyself.ratings, updateFilmData._id],
		};

		const updateMyData = await User.findByIdAndUpdate(userId, addFilmToMyRatings, { new: true });

		await updateMyData.save();
	
		const isRate = updateFilmData.ratingUsersId.some(item => item.userId.toString() === userId);

		return res.status(200).json({	isRate, film: filmResponse });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;