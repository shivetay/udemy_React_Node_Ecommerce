const express = require('express');
const router = express.Router();

/* import controllers */
const { userGet } = require('../controllers/user.controller.js');

/* 
@type  GET api/user
@descr dummy test endpoint
@private
*/

router.get('/user', userGet);

module.exports = router;
