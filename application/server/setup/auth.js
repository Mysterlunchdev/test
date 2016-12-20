var passport = require('passport');
var mongoose = require('mongoose');
var user = mongoose.model('user');

exports.authenticate = function(req, res, next) {
	passport.authenticate('local', function(err,user) {
		if (err) {return next(err);}
		if (!user) {res.redirect('/');}
		// if (user.activated==false){
		// 	return res.render('login', {error:true, email:user.email});
		// }
		req.logIn(user, function(err) {
			console.log("login");
			if (err) { return next(err);}
			res.redirect('/');
			return res.end();
		});
	})(req,res,next);
}

exports.isAuth = function (req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(403);
		res.send({reason:"You have no access to this area!"});
		res.end();
	} else {
		next();
	}
}

exports.logOut = function(req, res) {
	req.logOut();
	req.session.destroy(function(err) {
		if (err) console.log("error");
		console.log("no error");
		
	});
	req.session=null;
	res.status(200).end();
}