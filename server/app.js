const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
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

const PORT = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		app.listen(PORT, () => console.log(`App has been started on ${PORT} port...`));
	} catch (err) {
		console.log('Server error is: ' + err.message);
		process.exit(1);
	}
};

start();

