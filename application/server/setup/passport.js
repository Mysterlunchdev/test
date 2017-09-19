/*
	author: Markus Kuhn

	standard passport config	
*/

var mongoose = require('mongoose'),
	// jwt = require("jsonwebtoken"),
	LocalStrategy = require('passport-local').Strategy;
	var User = mongoose.model('user');

module.exports = function(passport) {
	console.log("local");
	passport.use(new LocalStrategy(
		function(username, password, done) {
			console.log("searching for user", username)
			User.findOne({email: username}).exec(function(err,user) {
				console.log(user);
				if (!!user && user.authenticate(password)) {
					console.log("correct");
					return done(null, user);
				} else {
					return done(null, false);
				}
			})
		}
	));

	passport.serializeUser(function(user,done) {
		if (user){
			done(null, user._id);
		}
		
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({_id:id}).exec(function(err,user) {
				if (user) {
					return done(null,user);
				} else {
					return done(null, false);
				}
		})
	});


}