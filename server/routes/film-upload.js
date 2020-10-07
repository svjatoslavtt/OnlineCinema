const { Router } = require("express");
const multer = require("multer");
const {uuid} = require("uuidv4");
const Film = require("../models/Film");

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
		if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg, .jpeg format'));
		}
	}
})

router.post('/', upload.single('file'), async (req, res) => {
	try {
		const url = req.protocol + '://' + req.get('host');

		const { userId, rating } = req.body;

		const film = new Film({
			...req.body,
			owner: userId,
			image: url + '/public/images/' + req.file.filename,
			ratingUsersId: {
				userId,
				rating,
			},
			averageRating: rating,
		});

		await film.save();

		return res.status(200).json({ message: 'Фильм успешно добавлен!', film });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;