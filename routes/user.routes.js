const express = require('express');
const router = express.Router();

/* import controllers */
const {
  findById,
  isAuth,
  isAdmin,
} = require('../controllers/user.controller.js');
const { requierSignin } = require('../controllers/auth.controller.js');

/* 
@type   api/userId
@descr  execute findbyid every time we have userId in our route
@public
*/
router.param('userId', findById);

router.post('/test/:userId', isAuth, requierSignin, findById, (req, res) => {
  res.json({ user: req.profile });
});

module.exports = router;
