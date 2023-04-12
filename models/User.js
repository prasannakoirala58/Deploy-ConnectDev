const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // match: /^[A-Za-z]+$/,
    required: [true, 'Please tell us your name without numbers'],
    // validate: {
    //   validator: function (v) {
    //     return /(1|2)([0-9])|(3)(0|1)|^([0-9]){1}$/.test(v);
    //   },
    //   message: `Your name should not contain numbers `,
    // },
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please set a password'],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
