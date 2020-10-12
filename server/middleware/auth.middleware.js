const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Нужно зарегистрироваться!' });
		}

		req.user = jwt.verify(token, config.get('jwtSecret'));
		next();
	} catch (err) {
		res.status(401).json({ message: 'Нужно зарегистрироваться!'} );
	}
};