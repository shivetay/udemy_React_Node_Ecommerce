const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

/* connect to db */
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB running O_O');
  } catch (err) {
    console.error(err.message);
    //after catching error this will exit whole process
    process.exit(1);
  }
};

module.exports = connectDB;
