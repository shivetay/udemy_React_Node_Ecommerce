const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const cookieParse = require('cookie-parser');
const expressValidator = require('express-validator');

/* Routes */
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();

/* DB connection */
connectDB();

/* Init midleware */
app.use(express.json({ extended: false }));
app.use(cookieParse());
app.use(morgan('dev'));
app.use(expressValidator());

app.use(
  cors({ origin: 'http://localhost:3000', methods: 'GET, POST, PUT, DELETE' })
);

/* Define routes */
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

app.use((req, res) => {
  res.status(404).send({ message: '404 not found...' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT} ^_^`));
