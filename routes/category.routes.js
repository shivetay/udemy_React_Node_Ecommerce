const express = require('express');
const router = express.Router();

/* import controllers */
const {
  createCategory,
  categoryById,
  readCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require('../controllers/category.controller.js');
const { findById } = require('../controllers/user.controller.js');
const {
  requierSignin,
  isAdmin,
  isAuth,
} = require('../controllers/auth.controller.js');

router.param('userId', findById);
router.param('categoryId', categoryById);

/* 
@type  POST api/category/create
@descr create category
@private
*/
router.post(
  '/category/create/:userId',
  requierSignin,
  isAuth,
  isAdmin,
  createCategory
);

/* 
@type   /category/:categorytId
@descr  find category
@private
*/

router.get(
  '/category/:categoryId/:userId',
  requierSignin,
  isAdmin,
  readCategory
);

/* 
@type   /category/:categorytId
@descr  update category
@private
*/

router.put(
  '/category/:categoryId/:userId',
  requierSignin,
  isAdmin,
  updateCategory
);

/* 
@type   /category/:categorytId/:userIs
@descr  delete category
@private
*/

router.delete(
  '/category/:categoryId/:userId',
  requierSignin,
  isAdmin,
  deleteCategory
);

/* 
@type   /category/:categorytId
@descr  get category
@private
*/

router.get('/categories', getAllCategories);

module.exports = router;
