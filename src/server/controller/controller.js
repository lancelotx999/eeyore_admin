/* Router Controllers */
const config = require('../config/config');
const Role = require('../model/role.model');
const User = require('../model/user.model');

// Import JWT & BCrypt
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// Controller - Sign Up
exports.signup = (req, res) => {
	// save user to database
	console.log("Processing func -> SignUp");

	const user = new User({
			name: req.body.name,
		username: req.body.username,
		   email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	});

	// save user to MongoDB
	user.save().then(savedUser => {
		Role.find({
			'name': { $in: req.body.roles.map(role => role.toUpperCase()) }
		}, (err, roles) => {
			if (err) {
				res.status(500).send("Error -> " + err);
			}

			// update user with roles
			savedUser.roles = roles.map(role => role._id);
			savedUser.save(function(err) {
				if (err) {
					res.status(500).send("Error -> " + err);
				}

				res.status(200).send({ "newUser": savedUser });
			});
		});
	}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	});
}

// Controller - Sign In
exports.signin = (req, res) => {
	console.log("Sign-In");
	console.log(req.body);

	User.findOne({ username: req.body.username })
		.exec((err, user) => {
			if (err) {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: "User not found with Username = " + req.body.username
					});
				}

				return res.status(500).send({
					message: "Error retrieving User with Username = " + req.body.username
				});
			}

			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({
						   auth: false,
					accessToken: null,
						 reason: "Invalid password."
				});
			}

			const expiry  =  24  *  60  *  60; // expires in 24 hours
			const token = jwt.sign({ _id: user._id }, config.secret, {
				expiresIn: expiry
			});

			res.status(200).send({
				"id": user._id,
				"name": user.name,
				"username": user.username,
				"email": user.email,
				"roles": user.roles,
				"token": token,
				"expiry": expiry
			});
		});
}

// Controller - User Content
exports.userContent = (req, res) => {
	User.findOne({ _id: req.userId })
		.select('-_id -__v -password')
		.populate('roles', '-_id -__v')
		.exec((err, user) => {
			if (err) {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: "User not found with _id = " + req.userId
					});
				}

				return res.status(500).send({
					message: "Error retrieving User with _id = " + req.userId
				});
			}

			res.status(200).json({
				"description": "User Content",
				"user": user
			});
		});
}

// Controller - Merchant Board
exports.merchantBoard = (req, res) => {
	User.findOne({ _id: req.userId })
		.select('-_id -__v -password')
		.populate('roles', '-_id -__v')
		.exec((err, user) => {
			if (err) {
				if (err.kind === 'ObjectId') {
					res.status(404).send({
						message: "User not found with _id = " + req.userId
					});

					return;
				}

				res.status(500).json({
					"description": "Cannot access Merchant Board",
					"error": err
				});

				return;
			}

			res.status(200).json({
				"description": "Merchant Board",
				"user": user
			});
		});
}

// Controller - Admin Board
exports.adminBoard = (req, res) => {
	User.findOne({ _id: req.userId })
		.select('-_id -__v -password')
		.populate('roles', '-_id -__v')
		.exec((err, user) => {
			if (err) {
				if (err.kind === 'ObjectId') {
					res.status(404).send({
						message: "User not found with _id = " + req.userId
					});

					return;
				}

				res.status(500).json({
					"description": "Cannot access Admin Board",
					"error": err
				});

				return;
			}

			res.status(200).json({
				"description": "Admin Board",
				"user": user
			});
		});
}
