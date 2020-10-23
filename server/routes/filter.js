const { Router } = require("express");
const Film = require("../models/Film");

const router = Router();

router.get('/directors', async (req, res) => {
	try {
		const films = await Film.find();
		const directors = films.map(item => item.director);
		const [...uniqDirectors] = new Set(directors);
	
		return res.status(200).json({ message: 'Режиссёры получены!', directors: uniqDirectors });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/search', async (req, res) => {
	try {
		let tags = [];

		if (req.body.title) {
			const films = await Film.find();
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
				});
			});

			return res.status(200).json({ message: 'Фильтрация по поиску успешна!', filter: [...transformFilms].reverse(), tags });
		};

		let commonFilter = [];

		for (key in req.body) {
			if (commonFilter.length) {
				const data = await Film.find({...commonFilter}).where(key).in(req.body[key]).exec();
				if (data.length) {
					commonFilter = data;
					tags.push(...req.body[key]);	
				}
			} else if (key === 'director') {
				const data = await Film.find().where(key).in(req.body[key]).exec();
				if (data.length) {
					commonFilter.push(...data);
					tags.push(...req.body[key]);
				}
			}

			if (key === 'popular' && commonFilter.length) {
				const data = await Film.find({...commonFilter});
				commonFilter = data.sort((a, b) => a.likes - b.likes);
				tags.push(key);
			} else if (key === 'popular') {
				const data = await Film.find();
				commonFilter = data.sort((a, b) => a.likes - b.likes);
				tags.push(key);
			};
		};

		console.log(commonFilter);

		const transformFilms = [];

		commonFilter.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Фильтрация успешна!', filter: [...transformFilms].reverse(), tags });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;