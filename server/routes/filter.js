const { Router } = require("express");
const Book = require("../models/Book");

const router = Router();

router.get('/directors', async (req, res) => {
	try {
		const films = await Book.find();
		const directors = films.map(item => item.director);
		const [...uniqDirectors] = new Set(directors);
	
		return res.status(200).json({ message: 'Режиссёры получены!', directors: uniqDirectors });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/filtering', async (req, res) => {
	try {
		let tags = [];

		if (req.body.title) {
			const films = await Book.find();
			const searchFilm = films.filter(item => 
				item.title.toUpperCase().includes(req.body.title.toUpperCase()));

			tags.push(req.body.title);	

			const transformFilms = [];

			searchFilm.forEach(item => {
				transformFilms.push({
					title: item.title,
					averageRating: item.averageRating,
					image: item.image,
					director: item.director,
					id: item._id,
					likes: item.likes,
				});
			});

			return res.status(200).json({ message: 'Фильтрация по поиску успешна!', filter: [...transformFilms].reverse(), tags });
		};

		if (req.body.director) {
			let commonFilter = [];

			for (key in req.body) {
				if (commonFilter.length && key === 'director') {
					const data = await Book.find({...commonFilter}).where(key).in(req.body[key]).exec();
					if (data.length) {
						commonFilter = data;
						tags.push(...req.body[key]);	
					}
				} else if (key === 'director') {
					const data = await Book.find().where(key).in(req.body[key]).exec();
					console.log(data);
					if (data.length) {
						commonFilter.push(...data);
						tags.push(...req.body[key]);
					};
				};
			};
	
			const transformFilms = [];
	
			commonFilter.forEach(item => {
				transformFilms.push({
					title: item.title,
					averageRating: item.averageRating,
					image: item.image,
					director: item.director,
					id: item._id,
					likes: item.likes,
				});
			});
	
			return res.status(200).json({ message: 'Фильтрация успешна!', filter: transformFilms, tags });
		};

		if (req.body.popular) {
			const films = await Book.find();
			const popularFilms = films.sort((a, b) => b.likes - a.likes);
			tags.push('самые популярные');

			const transformFilms = [];
	
			popularFilms.forEach(item => {
				transformFilms.push({
					title: item.title,
					averageRating: item.averageRating,
					image: item.image,
					director: item.director,
					id: item._id,
					likes: item.likes,
				});
			});

			return res.status(200).json({ message: 'Фильтрация успешна!', filter: transformFilms, tags });
		};
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;