/**
 * users controller
 */

var mongoose = require('mongoose'),
	userModel = mongoose.model('user'),
	ingredients = mongoose.model('ingredients'),
	days = mongoose.model('days'),
	meals = mongoose.model('meals'),
	Busboy = require('busboy'),
	mailer = require('../utilities/mailer'),
	upload = require('./uploads'),
	crypt = require('../utilities/encryption'),
	path = require('path'),
	request = require('request').defaults({ encoding: null }),
	helper = require('../utilities/helper'),
	fs = require('fs'),
	http = require('https'),
	crypto = require('crypto'),
	mongoose = require('mongoose'),
	user = mongoose.model('user'),
	AWS = require('aws-sdk'),
	request = require('request');


module.exports = {
	/**
	 * @api {get} /api/meal get meals
	 * @apiVersion 0.1.0
	 * @apiName getMeals
	 * @apiGroup Meals
	 * @apiDescription Get all meals 
	 *
	 *
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK 
     *   {list: [{
     *      name: {
     *       de: String,
     *       en: String
     *     },
     *     ingredients: [{
     *       de: String,
     *       en: String
     *     }],
     *     description: {
     *       de: String,
     *       en: String
     *     },
     *     specs: [{
     *       de: String,
     *       en: String,
     *       val: Number
     *     }],
     *     picture: String,
     *     price: [{
     *       name: String,
     *       price: String,
     *     }],
     *     fav: Number
     *   }]
     *  }
	 *
	 * @apiError Error When error in db
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 400 Bad Request
	 */
	getMeal: function(req,res) {
		
		meals.find({}).exec(function(err,data) {
			console.log("inside")
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {

				res.send({list:data});
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	/**
	 * @api {post} /api/meal create meal
	 * @apiVersion 0.1.0
	 * @apiName createMeal
	 * @apiGroup Meals
	 * @apiDescription Create new meal
	 *
	 *
	 * @apiParam {String} name["de"] - Name 
	 * @apiParam {String} name["en"] - Name 
	 * @apiParam {Array} ingredients[Object] - All ingredients
	 * @apiParam {Object} description - Object with de and en 
	 * @apiParam {Array} specs[] - Objects with de, en and val (0 for is not inside and 1 is inside) 
	 * @apiParam {String} picture -  URL to picture
	 * @apiParam {Array} price - Array includes objects with name and price
	 * @apiParam {String}  - 
	 * @apiParam {String}  - 
	 *
	 * @apiSuccessExample Success-Response:
	 *	HTTP/1.1 200 OK 
	 *		{
	 *			meal like db
	 *		}
	 *
	 * @apiError Error When form is wrong
	 *
	 * @apiErrorExample Error-Response:
	 *	HTTP/1.1 400 Bad Request
	 */
	createMeal: function(req,res) {
		var now = new meals(req.body);
		now.save(function(err){
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			res.send(now);
			res.status(200).end();
		})
	},
	/**
	 * @api {put} /api/meal/:id change meal
	 * @apiVersion 0.1.0
	 * @apiName changeMeal
	 * @apiGroup Meals
	 * @apiDescription change a specific meal
	 *
	 *
	 * @apiParam {Id} id - id of meal
	 * @apiParam {type} name - desc
	 *
	 * @apiSuccessExample Success-Response:
	 *	HTTP/1.1 200 OK 
	 *		object like meal
	 *
	 * @apiError Error When form is wrong
	 *
	 * @apiErrorExample Error-Response:
	 *	HTTP/1.1 400 Bad Request
	 */
	changeMeal: function(req,res) {
		meals.get({_id:req.params.id}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				for (var key in req.body) {
					data[key] = req.body[key];
				}
				data.save(function(err){
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					res.status(204).end();
				})
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	/**
	 * @api {delete} /api/meal/:id delete meal
	 * @apiVersion 0.1.0
	 * @apiName deleteMeal
	 * @apiGroup Meals
	 * @apiDescription delete Meal
	 *
	 *
	 * @apiParam {Id} id - id of meal
	 *
	 * @apiSuccessExample Success-Response:
	 *	HTTP/1.1 204 No Content 
	 *
	 * @apiError Error When form is wrong
	 *
	 * @apiErrorExample Error-Response:
	 *	HTTP/1.1 400 Bad Request
	 */
	deleteMeal: function(req,res) {
		meals.remove({_id:req.params.id}).exec(function(err) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			res.status(204).end();
		})
	},
	/**
	 * @api {post} /api/days/:id create new day with meal
	 * @apiVersion 0.1.0
	 * @apiName createDay
	 * @apiGroup Days
	 * @apiDescription create a new date in db and allocate meal to it
	 *
	 *
	 * @apiParam {Id} id - id of meal
	 * @apiParam {Date} day - date of allocation
	 *
	 * @apiSuccessExample Success-Response:
	 *	HTTP/1.1 200 OK 
	 *		{
	 *			day: Date,
	 *		}
	 *
	 * @apiError Error When form is wrong
	 *
	 * @apiErrorExample Error-Response:
	 *	HTTP/1.1 400 Bad Request
	 */
	createDay: function(req,res) {
		meals.findOne({_id:req.params.id}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				console.log("yau",req.body)
					var now = new days({
						day: new Date(req.body.day),
						_mealid:req.params.id,
						 name: {
							de: data.name.de,
							en: data.name.en
						},
						ingredients: data.ingredients,
						number: req.body.number,
						description: data.description,
						specs: data.specs,
						picture: data.picture,
						price: data.price,
						fav: data.number
					})
					now.picture = data.picture;
					console.log(new Date());
					console.log(now)
					now.save(function(err){
						if (err) {
							console.log("error" + err.toString());
							res.status(400);
							res.send({reason:err.toString()});
							return res.end();
						}
						res.status(204).end();
					})	
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	changeDate: function(req,res) {

	},
	/**
	 * @api {get} /api/ingredients get ingredients
	 * @apiVersion 0.1.0
	 * @apiName getIngredients
	 * @apiGroup Ingredients
	 * @apiDescription get all ingredients
	 *
	 *
	 * @apiSuccessExample Success-Response:
	 *	HTTP/1.1 200 OK 
	 *		{
	 *			list: [{
	 *				name: {
	 +					de: String,
	 +					en: String	
	 +				}	
	 *			}]
	 *		}
	 *
	 * @apiError Error When form is wrong
	 *
	 * @apiErrorExample Error-Response:
	 *	HTTP/1.1 400 Bad Request
	 */
	getIngredients:function(req,res) {
		console.log("yo")
		ingredients.find({}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({list:data});
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	/**
	 * @api {post} /api/ingredients create ingredient
	 * @apiVersion 0.1.0
	 * @apiName createIngredient
	 * @apiGroup Ingredients
	 * @apiDescription create new ingredient
	 *
	 *
	 * @apiParam {String} de - german name
	 * @apiParam {String} en - english Name
	 *
	 * @apiSuccessExample Success-Response:
	 *	HTTP/1.1 204 No Content  
	 *
	 * @apiError Error When form is wrong
	 *
	 * @apiErrorExample Error-Response:
	 *	HTTP/1.1 400 Bad Request
	 */
	createIngredient: function(req,res) {
		console.log(req.body)
		var now = new ingredients(req.body);
		now.save(function(err){
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			res.status(204).end();
		})
	},
	deleteIngredient: function(req,res) {
		ingredients.remove({_id:req.params.id}).exec(function(err) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			res.status(204).end();
		})
	},
	changeIngredient: function(req,res) {

	},
	/**
	 * @api {get} /api/days get days
	 * @apiVersion 0.1.0
	 * @apiName getDays
	 * @apiGroup Days
	 * @apiDescription get all days
	 *
	 *
	 *
	 * @apiSuccessExample Success-Response:
	 *	HTTP/1.1 200 OK 
	 *		{
	 *			list: [{days}]
	 *		}
	 *
	 * @apiError Error When form is wrong
	 *
	 * @apiErrorExample Error-Response:
	 *	HTTP/1.1 400 Bad Request
	 */
	getDay: function(req,res) {
		console.log("getMeals")
		var cutoff = new Date();
		cutoff.setDate(cutoff.getDate());
		days.find({}).sort({ day: 'asc' }).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				var tmp = [];
				for (var i = 0; i < data.length; i ++) {
					var item = data[i];
					var index = helper.findInArrayDate(tmp, item.day, "day");
					if (index==-1) {
						tmp.push({
							day: item.day,
							meals: [item]
						})
					} else {
						tmp[index].meals.push(item);
					}
				}
				console.log(JSON.stringify(tmp, 3, "    "))
				res.send({list:tmp});
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	deleteDay: function(req,res)  {
		days.remove({_id:req.params.id}).exec(function(err) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			res.status(204).end();
		})
	},
	checkCodeAndRedirect: function(req,res) {
		userModel.findOne({email:req.params.email}).exec(function(err,data) {
			if (!!data) {
				console.log(data);
				if (req.params.code==data.code)
					if (data.rights==0) {
						data.activated=true;
						data.save();
						return req.logIn(data, function(err) {
							console.log("login");
							if (err) { return console.log(err.toString());}
							res.redirect('/profile/first');
							return res.end();
						});
						res.render('login')
						// return res.render('promoFulfill', {code: data.code, mail:data.email})
					} else {
						// return res.render('clientFulfill', {code: data.code, mail:data.email})
					}
			}
			res.status(404).end();
		});
	},
	updateUser: function(req,res) {
		for (var key in req.body) {
			req.user[key] = req.body[key];
		}
		req.user.save(function(err) {
			if (err) {
				console.log("error in users.js" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			res.send({user:req.user});
			res.status(204).end();
		})
	},
	createUser: function(req,res) {
		console.log("createUser", req.body);
		var user = new userModel(req.body);
		user.email = req.body.email.toLowerCase();
		user.salt = crypt.createSalt();
		user.hashed_pwd = crypt.hashpwd(user.salt, req.body.password);
		user.save(function(err) {
			// if err print stacktrace and send status 400 to user
			if (err) {
				console.log("error in users.js at /F/Arbeit/Projekte/default/server/controller/users.js line: 17 at" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			return res.status(204).end();
		})
		
	}, 
	fulfillUserClient: function(req,res) {
			AWS.config.region = 'eu-central-1';
			var s3bucket = new AWS.S3({params: {Bucket: 'promoplattform'}});

			var busboy = new Busboy({ headers: req.headers });
			req.pipe(busboy);
			busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
				req.body[fieldname] = val;
			});
			busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
				console.log("file");
				filename= filename.replace(/\s/g, '');
				req.body.filename=filename;
				console.log(filename, req.body.filename);
				var id = generateUUID();
				var cPath = req.params.mail;
				var s3obj = new AWS.S3({params: {Bucket: 'promoplattform', Key: 'promo/'+ cPath + '/'+id+'.' +filename.split('.').pop()}});
				req.body.cPath=cPath;
				req.body.id=id;
				s3obj.upload({Body:file}, function(err,data) {
					
				})


				file.on('end', function() {
					console.log('File [' + fieldname + '] Finished');
				});
			});
			busboy.on('finish', function() {
				console.log("body", req.body);
				console.log("body", req.body);
					// res.status(200).end();
					userModel.findOne({email:req.params.mail}).exec(function(err,data) {
						// if err print stacktrace and send status 400 to user
						if (err) {
							console.log("error in users.js at /F/Arbeit/Projekte/joachim_investor/server/controller/users.js line: 85 at" + err.toString());
							res.status(400);
							res.send({reason:err.toString()});
							return res.end();
						}
						if (!!data) {
							data.activated=true;
							data.save();
							return req.logIn(data, function(err) {
								console.log("login");
								if (err) { return console.log(err.toString());}
								res.redirect('/profile/first');
								return res.end();
							});
							console.log(req.body);
							if (req.params.code!=data.code) {
								return res.redirect('/wrong');
							}
							for (var key in req.body) {
								if (key!='costume')
									data[key] = req.body[key];
							}
							data.costume=[];
							data.skills=[];
							if (data.logo!=undefined) {

							}
							if (req.body.costume!=undefined)
								for (var i = 0 ; i < req.body.costume.length ; i++ ) {
									var val = parseFloat(req.body.costume[i])
									data.costume.push({
										val: val,
										wouldWear: true
									});
								}
							if (req.body.sprache!=undefined)
								if (req.body.sprache.indexOf('de')) {
									if (!!req.body.sprachde) {
										data.skills.push({
											val: 0,
											perfection: parseFloat(req.body.sprachde)
										})
									} else {
										data.skills.push({
											val: 0,
											perfection: 2
										})
									}
								}
							if (req.body.sprache!=undefined)
								if (req.body.sprache.indexOf('en')) {
									if (!!req.body.sprachen) {
										data.skills.push({
											val: 1,
											perfection: parseFloat(req.body.sprachen)
										})
									} else {
										data.skills.push({
											val: 1,
											perfection: 2
										})
									}
								}
							data.contact=[{}];
							if (req.body.contactfirstName!=undefined) data.contact[0].firstName=req.body.firstcontactName;
							if (req.body.contactlastName!=undefined) data.contact[0].lastName=req.body.contactlastName;
							if (req.body.contacttel!=undefined) data.contact[0].tel=req.body.contacttel;
							if (req.body.contactsex!=undefined) data.contact[0].sex=req.body.contactsex;
							if (req.body.contactmail!=undefined) data.contact[0].mail=req.body.contactmail;
							data.activated=true;
							console.log(data);
							data.save(function(err) {
								// if err print stacktrace and send status 400 to user
								if (err) {
									console.log("error in users.js at /F/Arbeit/Projekte/joachim_investor/server/controller/users.js line: 97 at" + err.toString());
									res.status(400);
									res.send({reason:err.toString()});
									return res.end();
								}
								if (data.rights==0 && req.body.firstName!=undefined) {
									return res.render('promoFulfill2', {code: data.code, mail:data.email})
								}
								req.logIn(data, function(err) {
									console.log("login");
									if (err) { return console.log(err.toString());}
									if (req.body.filename!='') {

										data.logo='https://s3.eu-central-1.amazonaws.com/promoplattform/promo/'+ req.body.cPath + '/'+req.body.id+'.' +req.body.filename.split('.').pop();
										data.save();
									}
									res.redirect('/');
									return res.end();
								});
								// mailer.inform('Neue Reg von ' + data.email + '<br>' + data);
							})
						} else {
							res.status(200).end();
						}
					})
			});			
			// return console.log("else");

			// userModel.findOne({email:req.params.mail}).exec(function(err,data) {
			// 	// if err print stacktrace and send status 400 to user
			// 	if (err) {
			// 		console.log("error in users.js at /F/Arbeit/Projekte/joachim_investor/server/controller/users.js line: 85 at" + err.toString());
			// 		res.status(400);
			// 		res.send({reason:err.toString()});
			// 		return res.end();
			// 	}
			// 	if (!!data) {
			// 		console.log(req.body);
			// 		if (req.params.code!=data.code) {
			// 			return res.redirect('/wrong');
			// 		}
			// 		for (var key in req.body) {
			// 			if (key!='costume')
			// 				data[key] = req.body[key];
			// 		}
			// 		data.costume=[];
			// 		data.skills=[];
			// 		if (data.logo!=undefined) {

			// 		}
			// 		if (req.body.costume!=undefined)
			// 			for (var i = 0 ; i < req.body.costume.length ; i++ ) {
			// 				var val = parseFloat(req.body.costume[i])
			// 				data.costume.push({
			// 					val: val,
			// 					wouldWear: true
			// 				});
			// 			}
			// 		if (req.body.sprache!=undefined)
			// 			if (req.body.sprache.indexOf('de')) {
			// 				if (!!req.body.sprachde) {
			// 					data.skills.push({
			// 						val: 0,
			// 						perfection: parseFloat(req.body.sprachde)
			// 					})
			// 				} else {
			// 					data.skills.push({
			// 						val: 0,
			// 						perfection: 2
			// 					})
			// 				}
			// 			}
			// 		if (req.body.sprache!=undefined)
			// 			if (req.body.sprache.indexOf('en')) {
			// 				if (!!req.body.sprachen) {
			// 					data.skills.push({
			// 						val: 1,
			// 						perfection: parseFloat(req.body.sprachen)
			// 					})
			// 				} else {
			// 					data.skills.push({
			// 						val: 1,
			// 						perfection: 2
			// 					})
			// 				}
			// 			}
			// 		data.activated=true;
			// 		console.log(data);
			// 		data.save(function(err) {
			// 			// if err print stacktrace and send status 400 to user
			// 			if (err) {
			// 				console.log("error in users.js at /F/Arbeit/Projekte/joachim_investor/server/controller/users.js line: 97 at" + err.toString());
			// 				res.status(400);
			// 				res.send({reason:err.toString()});
			// 				return res.end();
			// 			}
			// 			if (data.rights==0 && req.body.firstName!=undefined) {
			// 				return res.render('promoFulfill2', {code: data.code, mail:data.email})
			// 			}
			// 			req.logIn(data, function(err) {
			// 				console.log("login");
			// 				if (err) { return console.log(err.toString());}
			// 				res.redirect('/');
			// 				return res.end();
			// 			});
			// 			// mailer.inform('Neue Reg von ' + data.email + '<br>' + data);
			// 		})
			// 	} else {
			// 		res.status(200).end();
			// 	}
			// })
	},
	fulfillUser: function(req,res) {
		 userModel.findOne({email:req.params.mail}).exec(function(err,data) {
				// if err print stacktrace and send status 400 to user
				if (err) {
					console.log("error in users.js at /F/Arbeit/Projekte/joachim_investor/server/controller/users.js line: 85 at" + err.toString());
					res.status(400);
					res.send({reason:err.toString()});
					return res.end();
				}
				if (!!data) {
					data.activated=true;
					data.save();
					return req.logIn(data, function(err) {
							console.log("login");
							if (err) { return console.log(err.toString());}
							res.redirect('/profile/first');
							return res.end();
						});
					console.log(req.body);
					if (req.params.code!=data.code) {
						return res.redirect('/wrong');
					}
					for (var key in req.body) {
						if (key!='costume')
							data[key] = req.body[key];
					}
					data.costume=[];
					data.skills=[];
					if (data.logo!=undefined) {

					}
					if (req.body.costume!=undefined)
						for (var i = 0 ; i < req.body.costume.length ; i++ ) {
							var val = parseFloat(req.body.costume[i])
							data.costume.push({
								val: val,
								wouldWear: true
							});
						}
					if (req.body.sprache!=undefined)
						if (req.body.sprache.indexOf('de')) {
							if (!!req.body.sprachde) {
								data.skills.push({
									val: 0,
									perfection: parseFloat(req.body.sprachde)
								})
							} else {
								data.skills.push({
									val: 0,
									perfection: 2
								})
							}
						}
					if (req.body.sprache!=undefined)
						if (req.body.sprache.indexOf('en')) {
							if (!!req.body.sprachen) {
								data.skills.push({
									val: 1,
									perfection: parseFloat(req.body.sprachen)
								})
							} else {
								data.skills.push({
									val: 1,
									perfection: 2
								})
							}
						}
					data.activated=true;
					console.log(data);
					data.save(function(err) {
						// if err print stacktrace and send status 400 to user
						if (err) {
							console.log("error in users.js at /F/Arbeit/Projekte/joachim_investor/server/controller/users.js line: 97 at" + err.toString());
							res.status(400);
							res.send({reason:err.toString()});
							return res.end();
						}
						if (data.rights==0 && req.body.firstName!=undefined) {
							return res.render('promoFulfill2', {code: data.code, mail:data.email})
						}
						req.logIn(data, function(err) {
							console.log("login");
							if (err) { return console.log(err.toString());}
							res.redirect('/');
							return res.end();
						});
						// mailer.inform('Neue Reg von ' + data.email + '<br>' + data);
					})
				} else {
					res.status(200).end();
				}
			})
	},
	newMail: function(req,res) {
		userModel.findOne({email:req.params.email}).exec(function(err,data) {
			if (!!data) {
				mailer.sendEmail('activate', data);
				res.render('login', {ready:true})
			}
		})
	},
	createUserRedirect: function(req,res) {
		console.log("createUser", req.body);
		var user = new userModel(req.body);
		user.email = req.body.email.toLowerCase();
		user.salt = crypt.createSalt();
		user.hashed_pwd = crypt.hashpwd(user.salt, req.body.password);
		user.code = generateUUID();
		user.activated=false;
		user.save(function(err) {
			// if err print stacktrace and send status 400 to user
			if (err) {
				console.log("error in users.js at /F/Arbeit/Projekte/default/server/controller/users.js line: 17 at" + err.toString());
				res.status(400);
				// res.send({reason:err.toString()});

				res.render('errormail');
				return res.end();
			}
			// mailer.sendEmail('activate', user);
			return res.render('login', {success:true})
		})
		
	},
	getActUser: function(req,res){
		res.send({user:req.user});
		res.status(200).end();
	},
	getUser: function(req,res) {
		userModel.findOne({email:req.params.email}).exec(function(err,data) {
			// if err print stacktrace and send status 400 to user
			if (err) {
				console.log("error in users.js at /F/Arbeit/Projekte/default/server/controller/users.js line: 30 at" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({user: data});
				res.status(200).end();
			} else {
				res.send({user: {}});
				res.status(404).end();
			}
		})

	},
	getUserById: function(req,res) {
		userModel.findOne({_id:req.params.id}, '-salt -hashed_pwd').exec(function(err,data) {
			// if err print stacktrace and send status 400 to user
			if (err) {
				console.log("error in users.js at /F/Arbeit/Projekte/default/server/controller/users.js line: 30 at" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({user: data});
				res.status(200).end();
			} else {
				res.send({user: {}});
				res.status(404).end();
			}
		})

	},
	deleteUser: function(req,res) {

	}
}

function decodeBase64Image(dataString) {
	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
	response = {};
	if (matches!=undefined) {
	
		if (matches.length !== 3) {
		return new Error('Invalid input string');
		} else {
			response.type = matches[1];
			response.data = new Buffer(matches[2], 'base64');
			
			return response;

		}
	} else {
	response.type = 'image/png'
		response.data = new Buffer(dataString, 'base64');
		return response;
	}

}

function generateUUID(){
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};

function makeid()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}