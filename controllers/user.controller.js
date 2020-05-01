const User = require('../models/user.models');

//user middleware
exports.findById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id).exec();
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

/* check if user is authenticated */
exports.isAuth = (req, res, next) => {
  /* id we have user that will send id and is auth */
  let user = req.profile && req.auth;
  // let user = req.profile && req.auth && req.profile._id == req.auth._id;

  console.log(req.profile);
  console.log('auth', req.auth);
  console.log('id', req.profile._id);
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
