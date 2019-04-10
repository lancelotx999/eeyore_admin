/* RestAPIs Router */
const verifySignUp = require('./verifySignUp');
const verifyAuthToken = require('./verifyAuthToken');

module.exports = function(app) {
	const controller = require('../controller/controller');

	// POST route - Sign up
	app.post('/api/auth/signup', [
		verifySignUp.checkDuplicateUserNameOrEmail, 
		verifySignUp.checkRolesExisted
	], controller.signup);

	// POST route - Sign in
	app.post('/api/auth/signin', controller.signin);

	// GET route - User
	app.get('/api/test/user', [
		verifyAuthToken.verifyToken
	], controller.userContent);

	// GET route - Merchant
	app.get('/api/test/merchant', [
		verifyAuthToken.verifyToken,
		verifyAuthToken.isMerchantOrAdmin
	], controller.merchantBoard);

	// GET route - Admin
	app.get('/api/test/admin', [
		verifyAuthToken.verifyToken,
		verifyAuthToken.isAdmin
	], controller.adminBoard);
};
