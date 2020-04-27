const express = require('express');
const router = express.Router();

/* import controllers */
const { userGet, userRegister } = require('../controllers/user.controller.js');

/* 
@type  GET api/user
@descr get user
@public
*/

router.get('/user', userGet);

/* 
@type  POST api/user/signup
@descr signup user
@public
*/
router.post('/user/signup', userRegister);

module.exports = router;
