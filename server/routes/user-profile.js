const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");

const router = Router();

router.get('/films/:userId', async (req, res) => {
	try {
		const films = await Book.find({ owner: req.params.userId });
		const findMyself = await User.findById(req.params.userId);

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
				likes: item.likes,
			});
		});

		const user = {
			name: findMyself.name,
			id: req.params.userId,
		};

		return res.status(200).json({ message: 'Книги получены успешно', films: transformFilms.reverse(), user });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.get('/likes/:userId', async (req, res) => {
	try {
		const findMyself = await User.findById(req.params.userId);
		const films = await Book.find().where('_id').in(findMyself.likes).exec();

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
				likes: item.likes,
			});
		});

		return res.status(200).json({ message: 'Понравившееся книги получены успешно', films: transformFilms.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;