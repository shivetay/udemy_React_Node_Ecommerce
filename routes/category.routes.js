const express = require('express');
const router = express.Router();

/* import controllers */
const { createCategory } = require('../controllers/category.controller.js');
const { findById } = require('../controllers/user.controller.js');
const {
  requierSignin,
  isAdmin,
  isAuth,
} = require('../controllers/auth.controller.js');

router.param('userId', findById);

/* 
@type  POST api/category/create
@descr create category
@private
*/
router.post('/category/create/:userId', requierSignin, isAdmin, createCategory);

module.exports = router;
