const express = require('express');
const router = express.Router();

/* import controllers */
const { findById } = require('../controllers/user.controller.js');

/* 
@type   api/userId
@descr  execute findbyid every time we have userId in our route
@public
*/

router.param('userId', findById);

module.exports = router;
