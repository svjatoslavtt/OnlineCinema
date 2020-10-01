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

router.post('/upload', upload.single('file'), async (req, res) => {
	try {
		const url = req.protocol + '://' + req.get('host');

		const { userId } = req.body;

		const film = new Film({
			...req.body,
			owner: userId,
			image: url + '/public/images/' + req.file.filename,
		});

		await film.save();

		return res.status(200).json({ message: 'Фильм успешно добавлен!', film });
	} catch (err) {
		return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' });
	}
});

router.get('/news-feed', async (req, res) => {
	try {
		const films = await Film.find();

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				rating: item.rating,
				image: item.image,
				id: item._id,
			});
		});

		return res.status(200).json({ films: transformFilms.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

module.exports = router;