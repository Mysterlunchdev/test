module.exports = function(router) {

	var auth = require('./auth');
	var mongoose = require('mongoose');
	var request = require('request').defaults({ encoding: null });
	var crypto = require('crypto');
	// var Connection = require('ssh2');
	var users = require('../controller/users');
	var upload = require('../controller/uploads');
	var userModel = mongoose.model('user');
	var util = require('util');
	var path = require('path');
	var fs = require('fs');
	var passport = require('passport');

	// var CronJob = require('cron').CronJob;
	// var job = new CronJob('00 20 01 * * 1-7', event.sendMailsOnceADay, function () {
	//    	console.log("cron durch");
	//   },
	//   true, /* Start the job right now */
	//   "Europe/Berlin" /* Time zone of this job. */
	// );
	
	// partials to save password blanking
	router.get('/partials/main/blank', function(req,res) {
		res.status(200).end();
		res.end();
	});

	// Api documentation getting

	router.get('/apidocs/*', function(req,res) {
		console.log(req.params);
		
		res.sendfile('./docs/api/'+req.params['0']);
	});



	// Getting partials
	router.get('/partials/*', function(req,res) {
		res.render('../../public/app/' + req.params['0']);
		res.end();

	});

	// getting pages static in view
	router.get('/page/*', function(req,res) {
		res.render('../../server/views/pages/' + req.params['0']);
		res.end();

	});



	// end partials


	/**
	 * LOGIN START
	 */


	router.get('/api/meal', auth.isAuth, users.getMeal)
	router.get('/api/meal/:id', users.getSpecMeal)
	router.get('/api/days/:id', users.getLikes)
	router.get('/api/days/:id/:canteen', users.getDay)
	router.post('/api/meal', auth.isAuth, users.createMeal)
	router.put('/api/meal/:id', auth.isAuth, users.changeMeal)
	router.delete('/api/meal/:id', auth.isAuth, users.deleteMeal)
	router.post('/api/days/:id', auth.isAuth, users.createDay)
	router.put('/api/days', auth.isAuth, users.updateDay)
	router.post('/api/ingredients', auth.isAuth, users.createIngredient)
	router.delete('/api/ingredients/:id', auth.isAuth, users.deleteIngredient)
	router.delete('/api/days/:id', auth.isAuth, users.deleteDay)
	router.get('/api/ingredients', auth.isAuth, users.getIngredients)
	router.get('/api/days', users.getDay)
	// router.get('/api/daysCanteen', users.getDay)
	router.get('/api/fav/:id', auth.isCORS, users.getFavorites)
	router.get('/api/favdetail/:id', auth.isCORS, users.getFavoritesDetail)
	router.post('/api/fav/:id/:mealid', auth.isCORS, users.addMealToFavorite)
	router.delete('/api/fav/:id/:mealid', auth.isCORS, users.deleteMealToFavorite)
	router.get('/api/menu/:id', users.getMenu)
	router.get('/api/all/:id', auth.isCORS, users.getAll)
	router.get('/api/news', users.getNews)
	router.get('/api/twitter', users.getTwitter)
	router.get('/api/news/:id', users.getNewsDetail)
	router.post('/api/news/', users.createNews)
	
	router.post('/api/menu/:id/:mealid',auth.isCORS, users.addMealToMenu)
	router.put('/api/menu/:id/:mealid',auth.isCORS, users.deleteMealToMenu)
	router.post('/api/fav/:id', auth.isCORS, users.createUserMeal)
	router.get('/api/specs/', auth.isCORS, users.getSpec)
	router.put('/api/specs/', auth.isCORS, users.changeSpec)
	router.post('/api/feedback/', users.sendFeedback)
	router.post('/api/like/:id/:mealid', users.likeMeal)

	// Canteen pushing
	router.get('/api/canteen/', users.getCanteens)
	router.post('/api/canteen/', users.createCanteen)

	router.get('/api/crowd/', users.getNumber)
	router.post('/api/crowd/', users.createNumber)



	router.get('/activation/:email/:code', users.checkCodeAndRedirect)
	router.get('/activation/', users.sendtestmail)
	router.get('/mealsreset', users.resetMeals)


	router.post('/upload/:item/', upload.uploadFiles);
	router.post('/api/count/:name/', users.count);
	router.put('/cut/', upload.cutLogo);


	router.post('/register', users.createUserRedirect);
	router.post('/login', auth.authenticate);
	router.post('/login/auth', auth.isCORS);



	router.get('/fulfill/:mail/:code', function(req,res) {
		console.log(req.params);
		res.render('promoFulfill2', {code: req.params.code, mail:req.params.mail})
	});

	router.post('/logout', auth.logOut);
	router.get('/logout', auth.logOut);

	/**
	 * LOGIN END
	 */
	/**
	 * USERS 
	 */

	router.get('/api/user', users.getUser);
	router.post('/api/user', users.createUser);





	// Getting all and render index if logged in
	router.get('*', function(req, res) {
		var url = req.params['0'].replace(/\//g, '');
		console.log("url2", url);
		res.render(url, function(err,html) {
			if (err) {
				console.log("error while reading", url);
				if (!!req.user) {
					console.log("user", req.user);
					res.render('index', {user:req.user});
				} else {
					res.render('login');
				}
				
			} else {
				console.log("else", req.user)
				if (!!req.user) { res.render('index', {user:req.user}); console.log(req.user); } 
				else
					if (url=='') res.render('login')
					else
						res.send(html)
			}
		})
	});

	return router;
}
