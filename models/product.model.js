const mongoose = require('mongoose');
// const { ObejctId } = mongoose.Schema;

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
      type: mongoose.Schema.ObjectId,
      ref: 'category',
      require: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      require: true,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model('product', ProductSchema);
