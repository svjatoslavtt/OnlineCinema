const { Router } = require("express");
const Film = require("../models/Film");

const router = Router();

router.post('/page', async (req, res) => {
	try {
		const page = req.body.page;

		// get 10 films for current page
		const lastIndeOfRequestFilms = Number(page + '0');
		const films = await Film.find();

		const reverseFilmsForCurrentPage = [];

		for (let k = ((films.length - 1) - lastIndeOfRequestFilms + 10); k >= ((films.length - 1) - lastIndeOfRequestFilms + 1); k--) {
			if (k >= 0) {
				reverseFilmsForCurrentPage.push(films[k]);
			};
		};

		const transformFilms = [];

		reverseFilmsForCurrentPage.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
				owner: item.owner,
				likes: item.likes,
			});
		});

		// get page count for pagination
		const pageCount = Math.ceil(films.length / 10);
		const pagesArray = [];

		for (let i = 1; i <= pageCount; i++) {
			if (i <= (page + 2) && i >= (page - 2)) {
				pagesArray.push(i);
			};
		};

		const pagination = {
			pages: pagesArray,
			currentPage: page,
		};

		return res.status(200).json({ message: `Страница ${page} успешно получена!`, films: transformFilms, pagination });
	} catch (err) {
		return res.status(500).json({ message: err.message });	
	};
});

module.exports = router;