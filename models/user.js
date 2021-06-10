const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const userSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;