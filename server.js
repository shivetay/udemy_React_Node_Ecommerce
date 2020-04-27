const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

/* DB connection */
connectDB();

/* Init midleware */
app.use(express.json());
app.use(helmet());

app.use(
  cors({ origin: 'http://localhost:3000', methods: 'GET, POST, PUT, DELETE' })
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT} ^_^`));
