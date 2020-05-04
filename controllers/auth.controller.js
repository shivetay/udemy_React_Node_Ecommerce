const config = require('config');

const jwt = require('jsonwebtoken'); //generate token
const expressJwt = require('express-jwt'); //auth check

const User = require('../models/user.model');
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
    const token = jwt.sign({ _id: user._id }, secretJwt);

    //keep token in cookie
    res.cookie('t', token, {
      expire: new Date() + 9999,
    });
    const payload = {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
    return res.json({
      token,
      payload,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// exports.userSignIn = (req, res) => {
//   // find the user based on email
//   const { email, password } = req.body;
//   User.findOne({ email }, (err, user) => {
//     if (err || !user) {
//       return res.status(401).json({
//         errors: [
//           {
//             msg: 'Invalid credentials',
//           },
//         ],
//       });
//     }
//     // if user is found make sure the email and password match
//     // create authenticate method in user model
//     if (!user.authenticateUser(password)) {
//       return res.status(401).json({
//         errors: [
//           {
//             msg: 'Invalid credentials',
//           },
//         ],
//       });
//     }
//     // generate a signed token with user id and secret
//     const token = jwt.sign({ _id: user._id }, secretJwt);
//     // persist the token as 't' in cookie with expiry date
//     res.cookie('t', token, { expire: new Date() + 9999 });
//     // return response with user and token to frontend client
//     const { _id, name, email, role } = user;
//     return res.json({ token, user: { _id, email, name, role } });
//   });
// };

/* user sign out */
exports.userSignOut = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout succes' });
};

exports.requierSignin = expressJwt({
  secret: secretJwt,
  userProperty: 'auth',
});

/* check if user is authenticated */
exports.isAuth = (req, res, next) => {
  /* id we have user that will send id and is auth */
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  console.log('auth id', req.auth._id);
  console.log('auth', req.auth);
  console.log('profile id', req.profile._id);
  console.log('profile', req.profile);
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
