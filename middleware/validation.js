const { check, validationResult } = require('express-validator'); //validation for POST

exports.userValidation = (req, res, next) => {
  [
    // validation
    check('name', 'Name is requierd').notEmpty(),
    check('email', 'Add valid email').isEmail().notEmpty(),
    check('password', 'Password requier min 6 or more characters')
      .isLength({
        min: 6,
      })
      .notEmpty(),
    // .matches(/\d/)
  ];
  const errors = validationResult(req);
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
