const User = require('../models/user.models');

exports.findById = (req, res) => {
  User.findById(id).exec(() =>)
}