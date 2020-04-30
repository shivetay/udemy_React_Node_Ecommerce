const express = require('express');
const router = express.Router();

/* import controllers */
const { createCategory } = require('../controllers/category.controller.js');

/* 
@type  POST api/category/create
@descr create category
@private
*/
router.post('/category/create', createCategory);

module.exports = router;
