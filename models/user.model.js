const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: {
      type: String,
      required: true,
      trim: true, //remove spaces
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    about: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
    salt: String,
  },
  { timestamps: true }
);

//virtual field
//password is from client side
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password; //_passwor = temp variable
    this.salt = uuidv4();
    this.hash_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticateUser: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hash_password;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      // detials of use in express documentation
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};

module.exports = User = mongoose.model('user', UserSchema);
