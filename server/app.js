const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());

app.use('/public', express.static('public'));

app.use('/api/auth/', require('./routes/auth'));
app.use('/api/film-upload/', require('./routes/film-upload'));
app.use('/api/film/', require('./routes/film'));
app.use('/api/likes/', require('./routes/likes'));
app.use('/api/rate/', require('./routes/rating'));
app.use('/api/user-profile/', require('./routes/user-profile'));
app.use('/api/filter/', require('./routes/filter'));
app.use('/api/pagination/', require('./routes/pagination'));

// if (process.env.NODE_ENV = 'production') {
// 	app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));

// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
// 	});
// };

const PORT = process.env.PORT || 5000;

async function start() {
	try {
		await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		app.listen(PORT, () => console.log(`App has been started on ${PORT} port...`));
	} catch (err) {
		console.log('Server error is: ' + err.message);
		process.exit(1);
	};
};

start();

