const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: {
      type: String,
      required: true,
      trim: true, //remove spaces
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
