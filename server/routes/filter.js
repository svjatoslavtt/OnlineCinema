const { Router } = require("express");
const Book = require("../models/Book");

const router = Router();

router.get('/directors', async (req, res) => {
	try {
		const books = await Book.find();
		const directors = books.map(item => item.director);
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
			const books = await Book.find();
			const searchBook = books.filter(item => 
				item.title.toUpperCase().includes(req.body.title.toUpperCase()));

			tags.push(req.body.title);	

			const transformBooks = [];

			searchBook.forEach(item => {
				transformBooks.push({
					title: item.title,
					averageRating: item.averageRating,
					image: item.image,
					director: item.director,
					id: item._id,
					likes: item.likes,
				});
			});

			return res.status(200).json({ message: 'Фильтрация по поиску успешна!', filter: [...transformBooks].reverse(), tags });
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
	
			const transformBooks = [];
	
			commonFilter.forEach(item => {
				transformBooks.push({
					title: item.title,
					averageRating: item.averageRating,
					image: item.image,
					director: item.director,
					id: item._id,
					likes: item.likes,
				});
			});
	
			return res.status(200).json({ message: 'Фильтрация успешна!', filter: transformBooks, tags });
		};

		if (req.body.popular) {
			const books = await Book.find();
			const popularBooks = books.sort((a, b) => b.likes - a.likes);
			tags.push('самые популярные');

			const transformBooks = [];
	
			popularBooks.forEach(item => {
				transformBooks.push({
					title: item.title,
					averageRating: item.averageRating,
					image: item.image,
					director: item.director,
					id: item._id,
					likes: item.likes,
				});
			});

			return res.status(200).json({ message: 'Фильтрация успешна!', filter: transformBooks, tags });
		};
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;