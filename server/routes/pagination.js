const { Router } = require("express");
const Film = require("../models/Film");

const router = Router();

router.post('/page', async (req, res) => {
	try {
		const page = req.body.page;
		const lastIndeOfRequestFilms = Number(page + '0');
		const films = await Film.find();
		const filmsForCurrentPage = [];
 
		for (let i = lastIndeOfRequestFilms; i >= (lastIndeOfRequestFilms - 10); i--) {
			if (films[i - 1] && i >= lastIndeOfRequestFilms - 9) {
				filmsForCurrentPage.push(films[i - 1]);
			};
		};

		const transformFilms = [];

		filmsForCurrentPage.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
			});
		});

		const pageCount = Math.ceil(films.length / 10);
		const pageArray = [];

		for (let i = 1; i <= pageCount; i++) {
			if (i <= (page + 2) && i >= (page - 2)) {
				pageArray.push(i);
			};
		};

		const pagination = {
			pages: pageArray,
			currentPage: page,
		};

		return res.status(200).json({ message: `Страница ${page} успешно получена!`, films: transformFilms, pagination });
	} catch (err) {
		return res.status(500).json({ message: err.message });	
	};
});

module.exports = router;