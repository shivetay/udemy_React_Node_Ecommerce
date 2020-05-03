const express = require('express');
const router = express.Router();

/* import controllers */
const {
  userGet,
  userRegister,
  userSignIn,
  userSignOut,
} = require('../controllers/auth.controller.js');

const { userValidation } = require('../middleware/validation');

/* 
@type  GET api/user
@descr get user
@public
*/

router.get('/user', userGet);

/* 
@type  POST api/signup
@descr signup user
@public
*/
router.post('/signup', userValidation, userRegister);

/* 
@type  POST api/signin
@descr sigin user
@public
*/
router.post('/signin', userSignIn);

/* 
@type  GET api/signout
@descr sign out user
@public
*/

router.get('/signout', userSignOut);

module.exports = router;
