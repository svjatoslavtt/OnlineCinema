const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");
const multer = require("multer");
const {v4} = require("uuid");

const router = Router();

router.get('/news-feed', async (req, res) => {
	try {
		const books = await Book.find();

		const firstTenBooks = [];

		for (let i = books.length - 1; i >= books.length - 10; i--) {
			firstTenBooks.push(books[i]);
		};

		const transformBooks = [];

		firstTenBooks.forEach(item => {
			transformBooks.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
				likes: item.likes,
			});
		});

		return res.status(200).json({ message: 'Книги получены успешно', books: transformBooks });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/detailed/:bookId', async (req, res) => {
	try {
		const currentBook = await Book.findById(req.params.bookId);
		const owner = await User.findById(currentBook.owner);

		const isLike = req.body.userId ? currentBook.usersId.includes(req.body.userId) : false;
		const isRate = currentBook.ratingUsersId.length ? currentBook.ratingUsersId.some(item => item.userId.toString() === req.body.userId) : false;
		const peopleRated = currentBook.ratingUsersId.length;
		
		const data = {
			...currentBook._doc,
			peopleRated,
			owner: {
				id: owner._id,
				name: owner.name,
			},
		};

		return res.status(200).json({ message: 'Книга получена успешно', currentBook: data, isLike, isRate });
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