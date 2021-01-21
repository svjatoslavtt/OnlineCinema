const { Router } = require("express");
const Book = require("../models/Book");
const User = require("../models/User");
const isAuth = require("../middleware/auth.middleware");
const router = Router();

router.post('/save/:bookId', isAuth,  async (req, res) => {
	try {
		const { bookId, userId } = req.body;
	
		const findUser = await User.findById(userId);
		const addBookToSaveForLater = {
			saveForLater: [...findUser.saveForLater, bookId],
		};
		const updateMyData = await User.findByIdAndUpdate(userId, addBookToSaveForLater, { new: true });
		await updateMyData.save();

		return res.status(200).json({ message: 'Книга добавлена в сохранённые!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.post('/remove-saved/:bookId', isAuth, async (req, res) => {
	try {
		const { bookId, userId } = req.body;

		const findUser = await User.findById(userId);
		const deleteBookFromSaves = findUser.saveForLater.filter(item => item.toString() !== bookId);

		const filteredSaveForLater = {
			saveForLater: [...deleteBookFromSaves],
		};

		const updateUserData = await User.findByIdAndUpdate(userId, filteredSaveForLater, { new: true });
		await updateUserData.save();

		return res.status(200).json({	message: 'Книга удалена с сохранённых!' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

module.exports = router;