const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');

/* Routes */
const userRoutes = require('./routes/user.routes');

const app = express();

/* DB connection */
connectDB();

/* Init midleware */
app.use(express.json());
app.use(helmet());

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
