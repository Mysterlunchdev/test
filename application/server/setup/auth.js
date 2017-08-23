var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var user = mongoose.model('user');

exports.authenticate = function(req, res, next) {
	if (req.body.username!=undefined) {
		console.log("username")
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
		
	} else {
		if (req.body.email!=undefined) {
			// find the user
			user.findOne({email: req.body.email},'_id rights hashed_pwd email salt device').exec(function(err, user) {

				if (err) throw err;

				if (!user) {
					res.status(404);
					res.json({ success: false, type: "user", message: 'Authentication failed. User not found.' });
				} else if (user) {

					// check if password matches
					if (!user.authenticate(req.body.password)) {
						res.status(401);
						res.json({ success: false, type:"password",  message: 'Authentication failed. Wrong password.' });
					} else {
						console.log("deviceid beim auth")
						user.deviceid=req.body.deviceid;
						console.log(user.deviceid);
						user.save();
						var token = ''

						// if user is found and password is right
						// create a token
						var token = jwt.sign(user, 'secret', {
							expiresIn: 1440*60 // expires in 24 hours
						});

						// return the information including token as JSON
						res.json({
							success: true,
							message: 'Enjoy your token!',
							token: token,
							user:user
						});
					}   

				}

			});
			
		}
	}
}

exports.authCORS = function(req,res,next) {

	// find the user
	user.findOne({email: req.body.email},'_id hashed_pwd rights email salt').exec(function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, type:"notfound", message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (!user.authenticate(req.body.password)) {
				res.json({ success: false, type:"password", message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, 'secret', {
					expiresInMinutes: 1 // expires in 24 hours
				});
				var token = ''
				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}   

		}

	});
}

exports.isCORS = function(req,res,next) {
	// check header or url parameters or post parameters for token
	var token =  req.headers['x-access-token'];
	// console.log("token", token);
	console.log("header", req.headers["official"]);
	// decode token
	if (token) {
		console.log("token set", token)
		jwt.verify(token, 'secret', function(err, decoded) {      
			if (err) {
				console.log("failed to auth")
				res.status(401)
			return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {
			// if everything is good, save to request for use in other routes
			req.decoded = decoded;
			console.log(decoded);
			user.findOne({_id:decoded._doc._id}).exec(function(err,data){
				if (!!data) {
					req.user = data;
					console.log(req.user)
					// res.send({success:true, user:data});
					next();
				}
			})
			}
		});

	} else {

	next();
	
	}
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