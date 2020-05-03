const config = require('config');

const jwt = require('jsonwebtoken'); //generate token
const expressJwt = require('express-jwt'); //auth check

const User = require('../models/user.models');
const secretJwt = config.get('jwtSecret');

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

/* user sign in */
exports.userSignIn = async (req, res) => {
  const { _id, email, password } = req.body;
  try {
    //find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Invalid credentials',
          },
        ],
      });
    }
    if (!user.authenticateUser(password)) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Invalid credentials',
          },
        ],
      });
    }
    // generate a token with id and secret
    const token = jwt.sign({ _id: _id }, secretJwt);

    //keep token in cookie
    res.cookie('t', token, {
      expire: new Date() + 9999,
    });
    // const payload = {
    //   user: {
    //     id: user._id,
    //     email: user.email,
    //     name: user.name,
    //     role: user.role,
    //   },
    // };
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* user sign out */
exports.userSignOut = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout succes' });
};

exports.requierSignin = expressJwt({
  secret: secretJwt,
  // userProperty: 'auth',
  // requestProperty: 'auth',
});

/* check if user is authenticated */
exports.isAuth = (req, res, next) => {
  /* id we have user that will send id and is auth */
  const isAuthUser = req.user._id;
  let user = req.profile._id == isAuthUser;
  // let user = req.profile === req.profile.id;

  console.log('profil', req.profile);
  console.log('auth', req.auth);
  // console.log('auth', req.auth._id);
  console.log('id', req.profile._id);
  console.log('id user', isAuthUser);
  console.log('user', user);
  if (!user) {
    return res.status(403).json({
      errors: [
        {
          msg: 'Access Denied',
        },
      ],
    });
  }
  next();
};

/* check for admin auth */
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      errors: [
        {
          msg: 'No Admin rights. Access Denied!!',
        },
      ],
    });
  }
  next();
};
