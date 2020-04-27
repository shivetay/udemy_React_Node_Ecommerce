const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); //validation for post

const User = require('../models/user.models');

exports.userGet = async (req, res) => {
  try {
    await res.json('user route');
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.userRegister = async (req, res) => {
  [
    // validation
    check('name', 'Name is requierd').not().isEmpty(),
    check('email', 'Add valid email').isEmail(),
    check('password', 'Password requier min 6 or more characters').isLength({
      min: 6,
    }),
  ];
  const error = validationResult(req);
  if (!error.isEmpty()) {
    // json({ errors: errors.array() }) this checks errors from validation
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    user = new User({
      name,
      email,
      password,
    });

    // encrytp password
    /* hasing passowrd. this returns a promise from jsonbcrypt.salt */
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // return jsonwebtoken

    const payload = {
      user: {
        id: user._id,
      },
    };

    //sends the token with expire timestamp/ connect it o user ID
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
