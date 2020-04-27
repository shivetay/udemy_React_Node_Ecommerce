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
  try {
    let user = new User(req.body);
    await user.save();

    return res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  // await user.save((err, user) => {
  //   if (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server error');
  //   }
  //   res.json({
  //     user,
  //   });
  // });
};

// exports.userRegister = async (req, res) => {
//   [
//     // validation
//     check('name', 'Name is requierd').not().isEmpty(),
//     check('email', 'Add valid email').isEmail(),
//     check('password', 'Password requier min 6 or more characters').isLength({
//       min: 6,
//     }),
//     // .matches(/\d/)
//   ];
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     // json({ errors: errors.array() }) this checks errors from validation
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { name, email, password, about } = req.body;
//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
//     }
//     user = new User({
//       name,
//       email,
//       password,
//       about,
//     });
//     // user = new User(req.data);

//     // encrytp password
//     /* hasing passowrd. this returns a promise from jsonbcrypt.salt */
//     const salt = await bcrypt.genSalt(10);

//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     // return jsonwebtoken

//     const payload = {
//       user: {
//         id: user._id,
//       },
//     };

//     //sends the token with expire timestamp/ connect it o user ID
//     jwt.sign(
//       payload,
//       config.get('jwtSecret'),
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         return res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

/* user signin */

// exports.userSignIn = async (req, res) => {
//   [
//     // validation
//     check('email', 'Add valid email').isEmail(),
//     check('password', 'Password requierd').exists(),
//   ];
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // json({ errors: errors.array() }) this checks errors from validation
//     return res.status(400).json({ errors: errors.array() });
//   }
//   // find user
//   const { email, password } = req.bod;

//   try {
//     // chek if user exists
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
//     }

//     // return jsonwebtoken

//     const payload = {
//       user: {
//         id: user._id,
//       },
//     };

//     //sends the token with expire timestamp/ connect it o user ID
//     // const token =
//     jwt.sign(
//       payload,
//       config.get('jwtSecret'),
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;

//         return res.json({ token, user: { _id, email, name, role } });
//       }
//     );
//     // res.cookie('t', token, { expire: new Date() + 9999 });
//     // const { _id, name, email, role } = user;
//     // return res.json({ token, user: { _id, email, name, role } });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
