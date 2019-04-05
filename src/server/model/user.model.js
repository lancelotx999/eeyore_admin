/* Mongoose Model - User */
const mongoose = require('mongoose'), Schema = mongoose.Schema;
// const Role = require('./role.model');

const UserSchema = mongoose.Schema({
    userID: String,
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    oAuth: String,
    roles: String
});

module.exports = mongoose.model('users', UserSchema);
