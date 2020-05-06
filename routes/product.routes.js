const express = require('express');
const router = express.Router();

/* import controlers */
const {
  createProduct,
  findProductById,
  getProduct,
  removeProduct,
  updateProduct,
  list,
  listRelated,
  listAllCategories,
  listBySearch,
  getPhoto,
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
@type   /product/:productId
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

/* 
@type   /product/:productId/:userId
@descr  delete product
@private
*/
router.delete(
  '/product/:productId/:userId',
  requierSignin,
  isAuth,
  isAdmin,
  removeProduct
);

/* 
@type   /product/:productId
@descr  update product
@private
*/
router.put(
  '/product/:productId/:userId',
  requierSignin,
  isAuth,
  isAdmin,
  updateProduct
);

/* 
@type   /products
@descr  return all products
@public
*/
router.get('/products', list);

/* 
@type   /products/related/:productId
@descr  return all products
@public
*/
router.get('/products/related/:productId', listRelated);

/* 
@type   products/categories
@descr  get all category related products
@public
*/

router.get('/products/categories', listAllCategories);

/* 
@type   /products/by/search
@descr  search
@public
*/
router.post('/products/by/search', listBySearch);

/* 
@type   /product/photo/:productId
@descr  getPhoto
@provate
*/
router.get('/product/photo/:productId', getPhoto);

module.exports = router;
