/**
 * users controller
 */

var mongoose = require('mongoose'),
	userModel = mongoose.model('user'),
	ingredients = mongoose.model('ingredients'),
	days = mongoose.model('days'),
	user = mongoose.model('alldevices'),
	meals = mongoose.model('meals'),
	news = mongoose.model('news'),
	crowd = mongoose.model('crowdflow'),
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
	// user = mongoose.model('user'),
	canteen = mongoose.model('canteens'),
	count = mongoose.model('count'),
	AWS = require('aws-sdk'),
	request = require('request');


module.exports = {
	getNumber: function(req,res){
		crowd.find({}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send(data);
				res.status(200).end()
			}
		})
	},
	createNumber: function(req,res){
				var now = new crowd({
					number: req.body.number,
					myid: 1
				})
				now.save();
				res.status(204).end()
	},
	count: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		count.findOne({name: req.params.name}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				console.log("wert von " + req.params.name + " ist " + data.val)
				if (data.val==undefined) data.val=0;
				data.val++;
				data.save();
				res.status(204).end();
			} else {
				console.log("data gibts nicht")
				var now = new count({
					name:req.params.name
				})
				now.save();
				res.status(204).end();
			}
		})
	},
	createCanteen: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		var now = new canteen(req.body);
		now.save(function(err){
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			res.status(204).end();
		});
	},
	getCanteens: function(req,res ){
		canteen.find({}).exec(function(err,data) {
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
	sendFeedback: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		mailer.inform(req.body.text);
		res.status(204).end();
	},
	getTwitter:function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		// var ig = require('instagram-node').instagram({});
		//   ig.use({ access_token: '2062016626.00fa5e6.17c1d1132fc04a0bacffd0c4a6d28454' });
		// //  	ig.media_popular(function(err, medias, remaining, limit) {
  // //   if (err) 
  // //     console.log("error too");
  // //   else 
  // //     console.log(medias);
  // // });
		//   ig.user('e.on_se', function(err, result, remaining, limit) {
		//   	if (err)
		// 	  	console.log("error", err.code, err.status_code)
		//   	console.log(result)
		//   });
		// // id for instagram 1740cfa0d0bc415eb1512d1e7151f750
		var Twitter = require('twitter');
		 
		var client = new Twitter({
		  consumer_key: 'wCehWNgy1tUVXEEBDFNHdWWjK',
		  consumer_secret: '5VpKLS6FAVzXOiZPeiyoRqsDCFifmFohTX03NPtBPAWXXnXenS',
		  access_token_key: '707214981419421696-lPEqdQ2wjxHhOoGui7lPzZe0UyFxq0A',
		  access_token_secret: 'hPb6CGt4tFYxrvck3VfZvI4xMNimVaaHizZo1iKKxsDa9'
		});
		 
		var params = {screen_name: 'eon_de'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		 	console.log("twitternews", response)
		  if (!error) {
		  		request('https://api.instagram.com/v1/users/self/media/recent/?access_token=2062016626.00fa5e6.17c1d1132fc04a0bacffd0c4a6d28454', function(error, response, body) {
		  			// console.log(JSON.stringify(res, censor(response)))
					  res.send({list:tweets, insta: JSON.parse(body)})
		  		})
		  } else {
		  	
			console.log("error witter", error)
			  res.send(error)
		  }
		});
	},
	createNews: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		var now = new news(req.body);
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
	getNews: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		news.find({}).exec(function(err,data) {
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
	getNewsDetail: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		news.findOne({_id:req.params.id}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				
				res.send({news:data});
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	getFavorites: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		// var token = req.body.token || req.query.token || req.headers['x-access-token'];
		// if (token!=undefined) {

		// }
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({list:data.meals,likes:data.likes, menu: data.menuplan});
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	getFavoritesDetail: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				var tmp = {$or:[]}
				for (var i = 0; i < data.meals.length; i++) {
					var index = helper.findInArray(tmp, data.meals[i]._mealid, "_id");
					if (index==-1)
						tmp.$or.push({_id: data.meals[i]._mealid});
				}
				meals.find(tmp).exec(function(err,data) {
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
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	getMenu: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({list:data.meals,likes:data.likes, menu: data.menuplan});
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	getAll: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({list:data.meals,likes:data.likes, menu: data.menuplan});
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	createUserMeal: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({list:data.meals, likes:data.likes, menu: data.menuplan});
				res.status(204).end();
			} else {
				var now = new user(req.body);
				if (req.user!=undefined) { now.userid= req.user._id}
				else now.deviceid = req.params.id;
				now.save(function(err){
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					res.status(204).end();
				})
			}
		})
	},
	getLikes: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		console.log("getlikes",req.params.id)
		meals.findOne({_id:req.params.id}).exec(function(err,data) {
			console.log("insiede")
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send({likes:data.likes});
			} else {
				res.send({});
			}
		})
	},
	likeMeal: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		console.log("addMealToFavorite")
		user.findOne({deviceid: req.params.id}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				meals.findOne({_id:req.params.mealid}).exec(function(err,data2) {
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					if (!!data2) {
						if (data2.likes==undefined) data2.likes=0;
						var index = helper.findInArray(data.likes, req.params.mealid, "_mealid");
						console.log(index)
						if (index==-1) {
							data2.likes++;
							data.likes.push({
								_mealid: req.params.mealid
							})
							data2.save(function(err) {
								if (err) {
									console.log("error" + err.toString());
								}
							});
						}
						console.log(data2.likes)

						data.save(function(err){
							if (err) {
								console.log("error" + err.toString());
								res.status(400);
								res.send({reason:err.toString()});
								return res.end();
							}
							res.send({list:data.meals, likes:data.likes});
						})
					} else {
						console.log("sending empty on addMealToFavorite: mealid undefined")
						res.send({});
						res.status(200).end();
					}

				})
			} else {
				console.log("send leer weil id nicht gefunden")
				res.send({});
				res.status(200).end();
			}
		})
	},

	addMealToFavorite: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		console.log("addMealToFavorite2")
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				meals.findOne({_id:req.params.mealid}).exec(function(err,data2) {
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					if (!!data) {
						data2.likes++;
						console.log("likes", data2.likes)
						data2.save();
						data.meals.push({
							_mealid: data2._id,
							name: data2.name,
							description: data2.description,
							picture: data2.picture,
							specs: data2.specs,
						})
						data.save(function(err){
							if (err) {
								console.log("error" + err.toString());
								res.status(400);
								res.send({reason:err.toString()});
								return res.end();
							}
							res.send({list:data.meals});
						})
					} else {
						console.log("sending empty on addMealToFavorite: mealid undefined")
						res.send({});
						res.status(200).end();
					}

				})
			} else {
				console.log("send leer2 weil id nicht gefunden")
				res.send({});
				res.status(200).end();
			}
		})
	},
	deleteMealToFavorite: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				meals.findOne({_id:req.params.mealid}).exec(function(err,data2) {
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					if (!!data) {
						if (data2.likes>0)
							data2.likes--;
						data2.save();
						var index = helper.findInArray(data.meals, req.params.mealid, "_mealid");
						console.log("deleteFav", index)
						if (index!=-1) data.meals.splice(index,1);
						// data.meals.push({
						// 	_mealid: data2._id,
						// 	name: data2.name,
						// 	description: data2.description,
						// 	picture: data2.picture,
						// 	specs: data2.specs,
						// })
						data.save(function(err){
							if (err) {
								console.log("error" + err.toString());
								res.status(400);
								res.send({reason:err.toString()});
								return res.end();
							}
							res.send({list:data.meals});
						})
					} else {
						console.log("sending empty on addMealToFavorite: mealid undefined")
						res.send({});
						res.status(200).end();
					}

				})
			} else {
				console.log("send leer3 weil id nicht gefunden")
				res.send({});
				res.status(200).end();
			}
		})
	},
	addMealToMenu: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				meals.findOne({_id:req.params.mealid}).exec(function(err,data2) {
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					if (!!data) {
						console.log("addMeal on index ", req.body.index)
						console.log(data.menuplan)
						var index = helper.findInArray(data.menuplan, req.body.index, "day");
						console.log("index", index)
						if (index!=-1) {
							console.log("!=-1")
							data.menuplan[index] ={
								day: req.body.index,
								_mealid: data2._id,
								name: data2.name,
								description: data2.description,
								picture: data2.picture,
								specs: data2.specs,
							}
						} else {
							console.log("==-11")
							data.menuplan.push({
								day: req.body.index,
								_mealid: data2._id,
								name: data2.name,
								description: data2.description,
								picture: data2.picture,
								specs: data2.specs,
							})
							
						}
						console.log("pushing done")
						console.log("mneuplan", JSON.stringify(data.menuplan));
						data.save(function(err){
							if (err) {
								console.log("error" + err.toString());
								res.status(400);
								res.send({reason:err.toString()});
								return res.end();
							}
							res.send({list:data.menuplan});
						})
					} else {
						console.log("sending empty on addMealToFavorite: mealid undefined")
						res.send({});
						res.status(200).end();
					}

				})
			} else {
				console.log("send leer4 weil id nicht gefunden")
				res.send({});
				res.status(200).end();
			}
		})
	},
	getSpecMeal: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		meals.findOne({_id:req.params.id}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				res.send(data);
			} else {
				res.send({});
				res.status(200).end();
			}
		})
	},
	getSpec: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		console.log("getting spec", req.user.veggie, req.user.vegan)
		res.send({specs: req.user.specs, veggie:req.user.veggie, vegan:req.user.vegan});
		res.status(200).end();
	},
	changeSpec: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		console.log("changespecs", req.body);
		if (req.body.veggie!=undefined) {
			if (req.user.veggie==undefined) req.user.veggie=true;
			else req.user.veggie=!req.user.veggie;
			console.log(req.user.veggie, "veggie")
			req.user.save();
			res.send({veggie:req.user.veggie, vegan: req.user.vegan});
			return res.status(204).end();
		}
		if (req.body.vegan!=undefined) {
			if (req.user.vegan==undefined) req.user.vegan=true;
			else req.user.vegan=!req.user.vegan;
			req.user.save();
			res.send({veggie:req.user.veggie, vegan: req.user.vegan});
			return res.status(204).end();
		}
		if (req.user.specs==undefined) {
			req.user.specs = [];
		}
		var index = helper.findInArray(req.user.specs, req.body.val, "val");
		if (index==-1) req.user.specs.push(req.body);
		else req.user.specs.splice(index,1);
		req.user.save();
		res.send({specs: req.user.specs});
		res.status(200).end();
	},
	deleteMealToMenu: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		if (req.user!=undefined) { var query = {userid: req.user._id}}
		else var query = {deviceid:req.params.id}
		user.findOne(query).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				meals.findOne({_id:req.params.mealid}).exec(function(err,data2) {
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					if (!!data) {
						console.log("in data meals")
						console.log("got menuplan index: ", req.body);
						console.log(data.menuplan)
						var index = helper.findInArray(data.menuplan, req.body.index, "day");
						console.log("index is ", index)
						if (index!=-1) {
							data.menuplan.splice(index,1);
						} else {
							
							
						}
						data.save(function(err){
							if (err) {
								console.log("error" + err.toString());
								res.status(400);
								res.send({reason:err.toString()});
								return res.end();
							}
							res.send({list:data.menuplan});
						})
					} else {
						console.log("sending empty on addMealToFavorite: mealid undefined")
						res.send({});
						res.status(200).end();
					}

				})
			} else {
				console.log("send leer weil id nicht gefunden")
				res.send({});
				res.status(200).end();
			}
		})
	},
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
	resetMeals: function() {
		meals.find({}).exec(function(err,data) {
			for ( var i = 0; i < data.length;i++) {
				data[i].price = [{
					de: {
						name: 'Mitarbeiter',
						price: '3 EUR'
					},
					en: {
						name: 'Employee',
						price: '3 EUR'
					}
				},{
					de: {
						name: 'Gast',
						price: '6 EUR'
					},
					en: {
						name: 'Guest',
						price: '6 EUR'
					}
				}]
				if (data[i]!=undefined)
						data[i].save();
			}
		})
		days.find({}).exec(function(err,data) {
			for ( var i = 0; i < data.length;i++) {
				data[i].price = [{
					de: {
						name: 'Mitarbeiter',
						price: '3 EUR'
					},
					en: {
						name: 'Employee',
						price: '3 EUR'
					}
				},{
					de: {
						name: 'Gast',
						price: '6 EUR'
					},
					en: {
						name: 'Guest',
						price: '6 EUR'
					}
				}]
				if (data[i]!=undefined)
					data[i].save();
			}
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		meals.findOne({_id:req.params.id}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
					var now = new days({
						day: new Date(req.body.day),
						_mealid:req.params.id,
						_canteenid: req.body._canteenid,
						 name: {
							de: data.name.de,
							en: data.name.en
						},
						ingredients: data.ingredients,
						number: req.body.number,
						description: data.description,
						specs: data.specs,
						meats: data.meats,
						ampel: data.ampel,
						adds: data.adds,
						picture: data.picture,
						price: data.price,
						fav: data.number
					})
					console.log(now)
					now.picture = data.picture;
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
	updateDay: function(req,res) {
		// console.log(req.body)
		// return ;
		days.find({}).exec(function(err, data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			} else {
				console.log("okay")
				for (var i = 0; i < req.body.meals.length; i++) {
					console.log(req.body.meals[i])
					var index = helper.findInArray(data, req.body.meals[i]._mealid, "_mealid");
					if (index!=-1)
						data[index].day=req.body.day2;
					console.log(index)
					data[index].save(function(err) {
						if (err) {
							console.log("error" + err.toString());
							res.status(400);
							res.send({reason:err.toString()});
							return res.end();
						} else {
							res.status(204).end();
						}
					})
				}
			}
			
		})
	},
	updateMeal: function(req,res) {
		meals.findOne({_id:req.params.id}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				data.ampel = req.body.ampel;
				days.find({"_mealid":data._id}).exec(function(err,data2) {
					if (err) {
						console.log("error" + err.toString());
						res.status(400);
						res.send({reason:err.toString()});
						return res.end();
					}
					if (!!data) {
						for (var i = 0; i < data2.length; i++) {
							console.log("updateDay")
							data2[i].ampel = data.ampel;
							data2[i].save();
						}
					} else {
						res.send({});
						res.status(200).end();
					}
				});
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
	changeDate: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';

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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';

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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		console.log("getMeals")
		var cutoff = new Date();
		cutoff.setDate(cutoff.getDate());
		if (req.params.canteen!=undefined) var query = {_canteenid:req.params.id};
		else var query = {};
		days.find(query).sort({ day: 'asc' }).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				console.log(data)
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
				// var nowdate = new Date();
				// nowdate.setDate(nowdate.getDate()-7);
				// var index = helper.findInArrayDate(tmp, nowdate, "day");
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		userModel.findOne({email:req.params.email}).exec(function(err,data) {
			if (!!data) {
				if (req.params.code==data.code) {
					data.activated=true;
					data.save();
					return req.logIn(data, function(err) {
						console.log("login");
						if (err) { return console.log(err.toString());}
						res.redirect('https://www.eon.de/de/pk.html');
						return res.end();
					});
					res.render('login')
					// return res.render('promoFulfill', {code: data.code, mail:data.email})
					
				}
			}
			res.status(404).end();
		});
	},
	updateUser: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
	sendtestmail: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		userModel.find({"email": "markus.egon.kuhn@gmail.com"}).exec(function(err,data) {
			if (err) {
				console.log("error" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			if (!!data) {
				mailer.sendEmail('code', {
					"email": "frank.dorbert@gmail.com",
					"code": "1",
				});
				res.status(200).end();
			}
		})

	},
	createUser: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		console.log("createUser", req.body);
		var user = new userModel(req.body);
		user.email = req.body.email.toLowerCase();
		user.salt = crypt.createSalt();
		user.code = generateUUID();
		mailer.sendEmail('code', user);
		user.hashed_pwd = crypt.hashpwd(user.salt, req.body.password);
		user.save(function(err) {
			// if err print stacktrace and send status 400 to user
			if (err) {
				console.log("error in users.js at /F/Arbeit/Projekte/default/server/controller/users.js line: 17 at" + err.toString());
				res.status(400);
				res.send({reason:err.toString()});
				return res.end();
			}
			console.log("everthing fine while savgi", user)
			return res.status(204).end();
		})
		
	}, 
	fulfillUserClient: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
		userModel.findOne({email:req.params.email}).exec(function(err,data) {
			if (!!data) {
				mailer.sendEmail('activate', data);
				res.render('login', {ready:true})
			}
		})
	},
	createUserRedirect: function(req,res) {
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';
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
		if (req.headers["official"]!=undefined) var official = req.headers["official"];
		else var official = '';

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

function censor(censor) {
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 

    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;  
  }
}