const express = require('express');
const router = express.Router();

/* import controllers */
const { findById } = require('../controllers/user.controller.js');
const {
  requierSignin,
  isAuth,
  isAdmin,
} = require('../controllers/auth.controller.js');

/* 
@type   api/userId
@descr  execute findbyid every time we have userId in our route
@public
*/
router.param('userId', findById);

router.get('/test/:userId', requierSignin, isAuth, (req, res) => {
  res.json({ user: req.profile });
});

module.exports = router;
