const { Router } = require("express");
const Film = require("../models/Film");
const User = require("../models/User");
const multer = require("multer");
const {v4} = require("uuid");

const router = Router();

router.get('/news-feed', async (req, res) => {
	try {
		const films = await Film.find();

		const firstTenFilms = [];

		for (let i = films.length - 1; i >= films.length - 10; i--) {
			firstTenFilms.push(films[i]);
		};

		const transformFilms = [];

		firstTenFilms.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Фильмы получены успешно', films: transformFilms });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/detailed/:filmId', async (req, res) => {
	try {
		const currentFilm = await Film.findById(req.params.filmId);
		const owner = await User.findById(currentFilm.owner);

		const isLike = req.body.userId ? currentFilm.usersId.includes(req.body.userId) : false;
		const isRate = currentFilm.ratingUsersId.length ? currentFilm.ratingUsersId.some(item => item.userId.toString() === req.body.userId) : false;
		const peopleRated = currentFilm.ratingUsersId.length;
		
		const data = {
			...currentFilm._doc,
			peopleRated,
			owner: {
				id: owner._id,
				name: owner.name,
			},
		};

		return res.status(200).json({ message: 'Фильм получен успешно', currentFilm: data, isLike, isRate });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

router.post('/my-films', async (req, res) => {
	try {
		const films = await Film.find({ owner: req.body.userId });

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Фильмы получены успешно', films: transformFilms.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.toString() });
	}
});

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

		const film = await Film.findByIdAndUpdate(req.body.filmId, fullData, { new: true });

		await film.save();
	
		return res.status(200).json({ message: 'Фильм успешно изменён!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/my-likes', async (req, res) => {
	try {
		const userId = req.body.userId;
		const findMyself = await User.findById(userId);
		const films = await Film.find().where('_id').in(findMyself.likes).exec();

		const transformFilms = [];

		films.forEach(item => {
			transformFilms.push({
				title: item.title,
				averageRating: item.averageRating,
				image: item.image,
				director: item.director,
				id: item._id,
			});
		});

		return res.status(200).json({ message: 'Понравившееся фильмы получены успешно', films: transformFilms.reverse() });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;