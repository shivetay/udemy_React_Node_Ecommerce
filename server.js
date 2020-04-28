const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const bodyParse = require('body-parser');
const cookieParse = require('cookie-parser');
const expressValidator = require('express-validator');

/* Routes */
const userRoutes = require('./routes/user.routes');

const app = express();

/* DB connection */
connectDB();

/* Init midleware */
app.use(bodyParse.json());
app.use(cookieParse());
app.use(morgan('dev'));
app.use(expressValidator());

app.use(
  cors({ origin: 'http://localhost:3000', methods: 'GET, POST, PUT, DELETE' })
);

/* Define routes */
app.use('/api', userRoutes);

app.use((req, res) => {
  res.status(404).send({ message: '404 not found...' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT} ^_^`));
