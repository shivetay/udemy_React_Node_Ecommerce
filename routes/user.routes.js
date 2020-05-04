const express = require('express');
const router = express.Router();

/* import controllers */
const { findById } = require('../controllers/user.controller.js');
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

module.exports = router;
