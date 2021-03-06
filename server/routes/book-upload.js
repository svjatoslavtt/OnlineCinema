const { Router } = require("express");
const multer = require("multer");
const {uuid} = require("uuidv4");
const Book = require("../models/Book");

const router = Router();

const DIR = './public/images/';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, uuid() + '-' + fileName);
	}
});

let upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg, .jpeg format'));
		}
	}
});

router.post('/', upload.single('file'), async (req, res) => {
	try {
		const url = 'http://' + req.get('host');

		const { userId, rating } = req.body;

		const book = new Book({
			...req.body,
			file: url + '/public/images/' + req.file.filename,
		});

		await book.save();

		return res.status(200).json({ message: 'Книга успешно добавлена!', book });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;