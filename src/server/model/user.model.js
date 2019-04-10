/* Mongoose Model - User */
const mongoose = require('mongoose'), Schema = mongoose.Schema;
// const Role = require('./role.model');

const UserSchema = mongoose.Schema({
  		name: String,
	username: String,
	   email: String,
	password: String,
	   roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
});

module.exports = mongoose.model('users', UserSchema);
