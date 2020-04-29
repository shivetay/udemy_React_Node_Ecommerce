const express = require('express');
const router = express.Router();

/* import controllers */
const {
  userGet,
  userRegister,
  userSignIn,
  userSignOut,
} = require('../controllers/user.controller.js');

// const auth = require('../middleware/auth');
const { userValidation } = require('../middleware/validation');

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
router.post('/user/signup', userValidation, userRegister);

/* 
@type  POST api/user/sigin
@descr sigin user
@public
*/
router.post('/user/signin', userSignIn);

/* 
@type  GET api/user
@descr sign out user
@public
*/

router.get('/user/signout', userSignOut);

module.exports = router;
