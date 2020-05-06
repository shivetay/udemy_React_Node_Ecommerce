const User = require('../models/user.model');

//user middleware
exports.findById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            msg: 'User not found',
          },
        ],
      });
    }
    req.profile = user; // this will get user profile based on User
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/* user read */
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

/* user update */

exports.update = (req, res) => {
  const { name, password } = req.body;

  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        errors: [
          {
            msg: 'User not found',
          },
        ],
      });
    }
    if (!name) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Name is requierd',
          },
        ],
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(401).json({
          errors: [
            {
              msg: 'Password need to have more than 6 chcarcters',
            },
          ],
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Update failed',
            },
          ],
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
      res.json(updatedUser);
    });
  });
};
