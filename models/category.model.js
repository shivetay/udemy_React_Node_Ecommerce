const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');

const CategorySchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: {
      type: String,
      required: true,
      trim: true, //remove spaces
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model('category', CategorySchema);
