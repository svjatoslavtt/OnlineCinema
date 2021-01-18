const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");
const multer = require("multer");
const {v4} = require("uuid");

const router = Router();

router.get('/news-feed', async (req, res) => {
	try {
		const books = await Book.find();

		return res.status(200).json({ message: 'Книги получены успешно', books });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.get('/discount-books', async (req, res) => {
	try {
		const books = await Book.find();

		const discountBooks = books.filter(item => item.discountPrice);

		return res.status(200).json({ message: 'Книги получены успешно', discountBooks });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/detailed/:bookId', async (req, res) => {
	try {
		const currentBook = await Book.findById(req.params.bookId);
		const user = await User.findById(req.body.userId);
		const booksByAuthor = await Book.find({ author: currentBook.author });
		const likeABook = await Book.find({ genre: currentBook.genre });

		const isBookSave = req.body.userId ? user.saveForLater.includes(req.params.bookId) : false;
		const isRate = currentBook.reviews.length ? currentBook.reviews.some(item => item.userId.toString() === req.body.userId) : false;
		const countOfRated = currentBook.reviews.length;
		
		const bookData = {
			...currentBook._doc,
			countOfRated,
		};

		return res.status(200).json({ 
			message: 'Книга получена успешно', 
			currentBook: bookData, 
			isBookSave, 
			isRate, 
			booksByAuthor: booksByAuthor.filter(item => item._id.toString() !== currentBook._id.toString()), 
			likeABook: likeABook.filter(item => item._id.toString() !== currentBook._id.toString()), 
		});
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/my-books', async (req, res) => {
	try {
		const books = await Book.find({ owner: req.body.userId });

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

		return res.status(200).json({ message: 'Книги получены успешно', books: transformBooks.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

// edit book 
const DIR = './public/images/';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, v4() + '-' + fileName);
	}
});

let upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg, .jpeg format'));
		}
	}
});

router.post('/edit', upload.single('file'), async (req, res) => {
	try {
		const url = req.protocol + '://' + req.get('host');

		let fullData = {};

		if (req.file) {
			fullData = {
				...req.body,
				image: url + '/public/images/' + req.file.filename,
			};
		} else {
			fullData = {
				...req.body,
			};
		};

		const book = await Book.findByIdAndUpdate(req.body.bookId, fullData, { new: true });

		await book.save();
	
		return res.status(200).json({ message: 'Книга успешно изменена!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/my-likes', async (req, res) => {
	try {
		const userId = req.body.userId;
		const findMyself = await User.findById(userId);
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