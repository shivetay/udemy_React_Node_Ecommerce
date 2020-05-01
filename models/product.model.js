const mongoose = require('mongoose');
const { ObejctId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: ObejctId,
      ref: 'category',
    },
    quantity: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model('product', ProductSchema);
