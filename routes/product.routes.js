const express = require('express');
const router = express.Router();

/* import controlers */
const {
  createProduct,
  findProductById,
} = require('../controllers/product.controller');
const {
  requierSignin,
  isAdmin,
  isAuth,
} = require('../controllers/auth.controller.js');
const { findById } = require('../controllers/user.controller.js');

router.param('userId', findById);
router.param('productId', findProductById);

/* 
@type   /product/productId
@descr  find product
@private
*/
router.get('/product/:productId', getProduct);

/* 
@type   '/product/create/:userId'
@descr  create new product
@private
*/

router.post(
  '/product/create/:userId',
  requierSignin,
  isAuth,
  isAdmin,
  createProduct
);

module.exports = router;
