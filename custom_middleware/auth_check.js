module.exports = checkAuth;

function checkAuth(req, res, next) {
	if (!req.session.user_id) {
		req.flash('info', 'Session has expired. Please log in.');
		res.redirect('login');
	} else {
		next();
	}
}