/**
 * @ngdoc controller
 * @name app.controller:MainCtrl
 * @scope
 *
 * @description
 * Main Controller for application
 *
 */

app.controller('MainCtrl', function($scope, Official, Canteen, News, delegator, Meals, Ingredients, Days, $window, $location, mvIdentity, mvNotifier) {
	// 1) Gluten, 2) Krebstiere, 3) Eier, 4) Fisch, 5) Erdnüsse, 6) Soja, 
	// 7) Milchlaktose, 8) Schalenfrüchte, 9) Sellerie, 10) Senf, 11) Sesam, 
	// 12) Schwefeldioxid, 13) Lupinen, 14) Weichtiere
// a) Konservierungsstoff, b) Antioxidationsmittel, c) Geschmacksverstärker, d) Süßungsmittel, e) Farbstoff, f) Phosphat
	
	$scope.officialuser = function() {
		delegator.PUT($scope.identity, Official, {}).then(function(data) {
			
		}, function(reason) {
			mvNotifier.error(reason);
		})
	} 

	$scope.update = function() {
		delegator.PUT($scope.identity, Official, {}).then(function(data) {
			console.log(data)
		}, function(reason) {
			mvNotifier.error(reason);
		})
	} 

	$scope.saveCanteen = function(item) {
		delegator.PUT(item, Canteen, {id:item._id}).then(function(data) {
			
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}	

	$scope.identity = mvIdentity.currentUser;
	console.log("$scope.", $scope.identity)

	$scope.meats = $scope.identity.meats;
	$scope.adds = $scope.identity.adds;
	$scope.specs = $scope.identity.specs;

	if (false==true)
	if ($scope.identity.specs.length==0) {

		$scope.identity.meats = [{
			de: 'Geflügel',
			en: '',
			val: 'G'
		},{
			de: 'Kalb',
			en: '',
			val: 'K'
		},{
			de: 'Lamm',
			en: '',
			val: 'L'
		},{
			de: 'Rind',
			en: '',
			val: 'R'
		},{
			de: 'Schwein',
			en: '',
			val: 'S'
		},{
			de: 'Wild',
			en: '',
			val: 'W'
		}]
		$scope.identity.adds = [{
			de: 'mit Farbstoff',
			en: '',
			val: '01'
		},{
			de: 'mit Konservierungsstoff',
			en: '',
			val: '02'
		},{
			de: 'mit Antioxidationsmittel',
			en: '',
			val: '03'
		},{
			de: 'mit Geschmacksverstärker',
			en: '',
			val: '04'
		},{
			de: 'geschwefelt',
			en: '',
			val: '05'
		},{
			de: 'geschwärzt',
			en: '',
			val: '06'
		},{
			de: 'mit Süßungsmittel(n)',
			en: '',
			val: '07'
		},{
			de: 'mit einer Zuckerart und Süßungsmittel(n)',
			en: '',
			val: '08'
		},{
			de: 'koffeinhaltig',
			en: '',
			val: '09'
		},{
			de: 'chininhaltig',
			en: '',
			val: '10'
		},{
			de: 'mit Phosphat',
			en: '',
			val: '11'
		},{
			de: 'gewachst',
			en: '',
			val: '12'
		},{
			de: 'enthält eine Phenylalaninquelle',
			en: '',
			val: '13'
		},{
			de: 'genetisch verändert',
			en: '',
			val: '14'
		},]
		$scope.identity.specs = [{
			de: 'Gluten',
			en: 'Gluten',
			val: 'a'
		},{
			de: 'Milch',
			en: 'Milch',
			val: 'b'
		},{
			de: 'Krebstiere',
			en: 'Krebstiere',
			val: 'c'
		},{
			de: 'Eier',
			en: 'Eier',
			val: 'd'
		},{
			de: 'Fisch',
			en: 'Fisch',
			val: 'e'
		},{
			de: 'Erdnüsse',
			en: 'Erdnüsse',
			val: 'f'
		},{
			de: 'Soja',
			en: 'Soja',
			val: 'g'
		},{
			de: 'Schalenfrüchte',
			en: 'Schalenfrüchte',
			val: 'h'
		},{
			de: 'Sellerie',
			en: 'Sellerie',
			val: 'i'
		},{
			de: 'Senf',
			en: 'Senf',
			val: 'k'
		},{
			de: 'Sesam',
			en: 'Sesam',
			val: 'l'
		},{
			de: 'Schwefeldioxid',
			en: 'Schwefeldioxid',
			val: 'm'
		},{
			de: 'Lupinen',
			en: 'Lupinen',
			val: 'n'
		},{
			de: 'Weichtiere',
			en: 'Weichtiere',
			val: 'o'
		}]
	}


	$scope.news = {
		title: '',
		text: '',
	}

	/**
	 * @ngdoc property
	 * @name Ingredient
	 * @propertyOf app.controller:MainCtrl
	 * @description
	 * Value of ingredient for inserting into db
	 *
	 */
	$scope.ingredient = {name:{
		de:'',
		en:''
	}};
	/**
	 * @ngdoc property
	 * @name meal
	 * @propertyOf app.controller:MainCtrl
	 * @description
	 * value of meal temp for inserting
	 *
	 */
	$scope.meal = {
		name: {
			de:'',
			en:''
		},
		ampel: '',
		ingredients:[],
		description: {
			de: '',
			en: ''
		}, 
		adds:[],
		meats:[],
		specs: [],
		price: [{
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
	};
	/**
	 * @ngdoc property
	 * @name day
	 * @propertyOf app.controller:MainCtrl
	 * @description
	 * value of day temp for inserting
	 *
	 */
	$scope.day 
	= {};

	/**
	 * @ngdoc method
	 * @name getIngredients
	 * @methodOf app.controller:MainCtrl
	 * @description
	 * get Ingredients from Server 
	 *
	 */
	$scope.getIngredients = function() {
		Ingredients.get({}, function(data) {
			/**
			 * @ngdoc property
			 * @name ingredients
			 * @propertyOf app.controller:MainCtrl
			 * @description
			 * all ingredients from server
			 *
			 */
			$scope.ingredients = data.list;
		})
	}
	$scope.getIngredients();

 	
	/**
	 * @ngdoc method
	 * @name addIngredient
	 * @methodOf app.controller:MainCtrl
	 * @description
	 * add ingredient to db
	 *
	 */
	$scope.addIngredient = function () {
		if ($scope.ingredient.name.de.length<5) return;
		if ($scope.ingredient.name.en.length<5) return;
		delegator.POST($scope.ingredient, Ingredients, {}).then(function(data) {
			// undefinee ingredient
			$scope.ingredient = {name:{
				de:'',
				en:''
			}};
			// get ingredients from server
			$scope.getIngredients();
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}
 
	$scope.deleteIngredient = function(item) {
		delegator.DELETE({}, Ingredients, {id:item._id}).then(function(data) {
			$scope.getIngredients();
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}

	/**
	 * @ngdoc method
	 * @name getMeals
	 * @methodOf app.controller:MainCtrl
	 * @description
	 * get all meals from server
	 *
	 */
	$scope.getMeals = function() {
		Meals.get({}, function(data) {
			/**
			 * @ngdoc property
			 * @name meals
			 * @propertyOf app.controller:MainCtrl
			 * @description
			 * all meals
			 *
			 */
			$scope.meals=data.list;
		})
	}
	$scope.getMeals();

	$scope.getCanteens = function() {
		Canteen.get({}, function(data) {
			$scope.canteens = data.list;
			console.log($scope.canteens)
		})
	}
 	$scope.getCanteens();

 	$scope.createCanteen = function(text) {
 		delegator.POST({name:text}, Canteen, {}).then(function(data) {
 			$scope.getCanteens();
 		}, function(reason) {
 			mvNotifier.error(reason);
 		})
 	} 

	/**
	 * @ngdoc method
	 * @name addMeal
	 * @methodOf app.controller:MainCtrl
	 * @description
	 * add meal to server
	 *
	 */
	$scope.addMeal = function() {
		delegator.POST($scope.meal, Meals, {}).then(function(data) {
			// success undefined - get new
			$scope.meal = {
				specs: [],
				adds: [],
				meats: [],
				ampel: '',
				price: [{
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
			};	
			$scope.getMeals();
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}

	$scope.getDays = function() {
		Days.get({}, function(data){
			$scope.days = data.list;
		})
	} 
	$scope.getDays();

	$scope.addDay = function() {
		delegator.POST($scope.day, Days, {id: $scope.day.id}).then(function(data) {
			$scope.days = {};
			$scope.getDays();
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}

	$scope.updateDay = function(item) {
		// console.log("updat day")
		delegator.PUT(item, Days, {id:item._id}).then(function(data) {
			console.log("yes");
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}
	$scope.updateMeal = function(item) {
		// console.log("updat day")
		delegator.PUT(item, Meals, {id:item._id}).then(function(data) {
			console.log("yes");
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}


	$scope.deleteDay = function(item) {
		delegator.DELETE({}, Days, {id:item._id}).then(function(data) {
			$scope.getDays();
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}


	// FILTEr
	$scope.isInsideIngredients = function( item ) {
		var index = findInArray($scope.meal.ingredients, item.name.de, 'de');
		if (index==-1) return true;
		else return false;
	};
	$scope.isInside = function( item ) {
		var index = findInArray($scope.ingredients, item.de, 'de');
		if (index==-1) return true;
		else return false;
	};
	// FILTEr
	$scope.isInsideAdds = function( item ) {
		var index = findInArray($scope.meal.adds, item.val, 'val');
		if (index==-1) return true;
		else return false;
	};
	$scope.isInsideMeats = function( item ) {
		var index = findInArray($scope.meal.meats, item.val, 'val');
		if (index==-1) return true;
		else return false;
	};
	$scope.isInsideSpec = function( item ) {
		var index = findInArray($scope.meal.specs, item.val, 'val');
		if (index==-1) return true;
		else return false;
	};
	$scope.isInsideSpecMeal = function( item ) {
		var index = findInArray($scope.specs, item.val, 'val');
		if (index==-1) return true;
		else return false;
	};

	News.get({}, function(data) {
		$scope.allnews = data.list;
	})


	$scope.addNews = function() {
		delegator.POST($scope.news, News, {}).then(function(data) {
			$scope.news = {};
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}


})

	