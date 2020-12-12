const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");

const router = Router();

router.get('/books/:userId', async (req, res) => {
	try {
		const books = await Book.find({ owner: req.params.userId });
		const findMyself = await User.findById(req.params.userId);

		const transformBooks = [];

		books.forEach(item => {
			transformBooks.push({
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

		return res.status(200).json({ message: 'Книги получены успешно', books: transformBooks.reverse(), user });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.get('/likes/:userId', async (req, res) => {
	try {
		const findMyself = await User.findById(req.params.userId);
		const books = await Book.find().where('_id').in(findMyself.likes).exec();

		const transformBooks = [];

		books.forEach(item => {
			transformBooks.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
				likes: item.likes,
			});
		});

		return res.status(200).json({ message: 'Понравившееся книги получены успешно', books: transformBooks.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;