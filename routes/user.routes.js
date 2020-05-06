const express = require('express');
const router = express.Router();

/* import controllers */
const { findById, update, read } = require('../controllers/user.controller.js');
const {
  requierSignin,
  isAuth,
  isAdmin,
} = require('../controllers/auth.controller.js');

router.param('userId', findById);

/* 
@type   api/userId
@descr  execute findbyid every time we have userId in our route
@public
*/

router.get('/test/:userId', requierSignin, isAuth, (req, res) => {
  res.json(req.profile);
});

/* 
@type   api/userId
@descr  read user
@public
*/
router.get('/user/:userId', requierSignin, isAuth, read);

/* 
@type   api/userId
@descr  update
@public
*/
router.put('/user/:userId', requierSignin, isAuth, update);

module.exports = router;
