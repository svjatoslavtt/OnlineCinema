const { Router } = require("express");
const Film = require("../models/Film");
const User = require("../models/User");

const router = Router();

router.get('/news-feed', async (req, res) => {
	try {
		const films = await Film.find();

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				rating: item.rating,
				image: item.image,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Фильмы получены успешно', films: transformFilms.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/detailed/:filmId', async (req, res) => {
	try {
		const currentFilm = await Film.findById(req.params.filmId);

		const isLike = currentFilm.usersId.includes(req.body.userId);

		return res.status(200).json({ message: 'Фильм получен успешно', currentFilm, isLike });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/my-films', async (req, res) => {
	try {
		const films = await Film.find({ owner: req.body.userId });

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				rating: item.rating,
				image: item.image,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Фильмы получены успешно', films: transformFilms.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/my-likes', async (req, res) => {
	try {
		const userId = req.body.userId;
		const findMyself = await User.findById(userId);
		const films = await Film.find().where('_id').in(findMyself.likes).exec();

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				rating: item.rating,
				image: item.image,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Понравившееся фильмы получены успешно', films: transformFilms.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
})

module.exports = router;