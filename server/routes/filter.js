const { Router } = require("express");
const Film = require("../models/Film");

const router = Router();

router.get('/directors', async (req, res) => {
	try {
		const films = await Film.find();
		const filterDirectors = films.map(item => item.director);
		const [...directors] = new Set(filterDirectors);
	
		return res.status(200).json({ message: 'Режиссёры получены!', directors });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/search', async (req, res) => {
	try {
		const searchText = req.body.title;

		const films = await Film.find();

		const searchTitle = films.filter(item => 
			item.title.toUpperCase().includes(searchText.toUpperCase()));

		const transformFilms = [];

		searchTitle.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Фильтрация успешна!', filter: [...transformFilms] });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;