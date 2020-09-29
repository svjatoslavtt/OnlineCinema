const { Router } = require("express");
const Film = require("../models/Film");

const router = Router();

router.post('/upload', async (req, res) => {
	try {
		const { userId } = req.body;

		const film = new Film({
			...req.body,
			owner: userId,
		});

		await film.save();

		return res.status(200).json({ message: 'Фильм успешно добавлен!' });
	} catch (err) {
		return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' });
	}
});

module.exports = router;