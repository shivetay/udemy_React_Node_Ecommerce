const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: {
      type: String,
      required: true,
      trim: true, //remove spaces
      maxlength: 32,
      unique: true,
    },
    description: {
      type: String,
      max: 32,
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model('category', CategorySchema);
