const { Router } = require("express");
const Book = require("../models/Book");

const router = Router();

router.post('/page', async (req, res) => {
	try {
		const page = req.body.page;

		// get 10 books for current page
		const lastIndeOfRequestBooks = Number(page + '0');
		const books = await Book.find();

		const reverseBooksForCurrentPage = [];

		for (let k = ((books.length - 1) - lastIndeOfRequestBooks + 10); k >= ((books.length - 1) - lastIndeOfRequestBooks + 1); k--) {
			if (k >= 0) {
				reverseBooksForCurrentPage.push(books[k]);
			};
		};

		const transformBooks = [];

		reverseBooksForCurrentPage.forEach(item => {
			transformBooks.push({
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
		const pageCount = Math.ceil(books.length / 10);
		const pagesArray = [];

		for (let i = 1; i <= pageCount; i++) {
			if (i <= (page + 2) && i >= (page - 2)) {
				pagesArray.push(i);
			};
		};

		const pagination = {
			pages: pagesArray,
			currentPage: page,
			lastPage: pageCount,
		};

		return res.status(200).json({ message: `Страница ${page} успешно получена!`, books: transformBooks, pagination });
	} catch (err) {
		return res.status(500).json({ message: err.message });	
	};
});

module.exports = router;