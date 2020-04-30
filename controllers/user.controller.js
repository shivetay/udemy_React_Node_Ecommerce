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
