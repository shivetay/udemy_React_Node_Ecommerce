const User = require('../models/user.models');

//user middleware
exports.findById = async (req, res, next, id) => {
  console.log('id from findById', id);
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
    console.log('id after req.profile = user', req.profile._id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  next();
};
// exports.findById = (req, res, next, id) => {
//   User.findById(id).exec((err, user) => {
//     if (err || !user) {
//       return res.status(401).json({
//         errors: [{ msg: 'User not found' }],
//       });
//     }
//     req.profile = user;
//     next();
//   });
// };
