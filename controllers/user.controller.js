// const config = require('config');
// const bcrypt = require('bcryptjs');

const User = require('../models/user.models');

exports.userGet = async (req, res) => {
  try {
    await res.json('user route');
  } catch (err) {
    res.status(500).json(err);
  }
};

/* user register */
exports.userRegister = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email }); //checks if emial is db
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    user = new User(req.body); // req.body is form body-parser
    await user.save();
    user.hash_password = undefined; //remove salt and password from callback
    user.salt = undefined;
    return res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
