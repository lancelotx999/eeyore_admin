/* Middleware - Verifying JSON web tokens */
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../model/user.model');
const Role = require('../model/role.model');

// checking a JWT token is valid or NOT
verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to authenticate. Error -> ' + err
			});
		}

		req.userId = decoded._id;
		next();
	});
}

// checking an User has ADMIN role or NOT
isAdmin = (req, res, next) => {
	User.findOne({ _id: req.userId })
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

			Role.find({
				'_id': { $in: user.roles }
			}, (err, roles) => {
				if (err) {
					res.status(500).send("Error -> " + err);
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name.toUpperCase() === "ADMIN") {
						next();
						return;
					}
				}

				res.status(403).send("Require Admin Role!");
				return;
			});
		});
}

// checking an User has PM or ADMIN role or NOT
isMerchantOrAdmin = (req, res, next) => {
	User.findOne({ _id: req.userId })
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

			Role.find({
				'_id': { $in: user.roles }
			}, (err, roles) => {
				if (err) {
					res.status(500).send("Error -> " + err);
				}

				for (let i = 0; i < roles.length; i++) {
					let role = roles[i].name.toUpperCase();
					if (role === "MERCHANT" || role === "ADMIN") {
						next();
						return;
					}
				}

				res.status(403).send("Require Merchant or Admin Role!");
				return;
			});
		});
}

const verifyAuthToken = {};
verifyAuthToken.verifyToken = verifyToken;
verifyAuthToken.isAdmin = isAdmin;
verifyAuthToken.isMerchantOrAdmin = isMerchantOrAdmin;

module.exports = verifyAuthToken;
