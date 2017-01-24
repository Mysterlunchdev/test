/**
 * @ngdoc controller
 * @name app.controller:MainCtrl
 * @scope
 *
 * @description
 * Main Controller for application
 *
 */

app.controller('MainCtrl', function($scope, News, delegator, Meals, Ingredients, Days, $window, $location, mvIdentity, mvNotifier) {
	// 1) Gluten, 2) Krebstiere, 3) Eier, 4) Fisch, 5) Erdnüsse, 6) Soja, 
	// 7) Milchlaktose, 8) Schalenfrüchte, 9) Sellerie, 10) Senf, 11) Sesam, 
	// 12) Schwefeldioxid, 13) Lupinen, 14) Weichtiere
// a) Konservierungsstoff, b) Antioxidationsmittel, c) Geschmacksverstärker, d) Süßungsmittel, e) Farbstoff, f) Phosphat

	$scope.adds = [{
		de: 'Konservierungsstoff',
		en: 'Konservierungsstoff',
		val: 'a'
	},{
		de: 'Antioxidationsmittel',
		en: 'Antioxidationsmittel',
		val: 'b'
	},{
		de: 'Geschmacksverstärker',
		en: 'Geschmacksverstärker',
		val: 'c'
	},{
		de: 'Süßungsmittel',
		en: 'Süßungsmittel',
		val: 'd'
	},{
		de: 'Farbstoff',
		en: 'Farbstoff',
		val: 'e'
	},{
		de: 'Phosphat',
		en: 'Phosphat',
		val: 'f'
	}]
	$scope.specs = [{
		de: 'Gluten',
		en: 'Gluten',
		val: '1'
	},{
		de: 'Krebstiere',
		en: 'Krebstiere',
		val: '2'
	},{
		de: 'Eier',
		en: 'Eier',
		val: '3'
	},{
		de: 'Fisch',
		en: 'Fisch',
		val: '4'
	},{
		de: 'Erdnüsse',
		en: 'Erdnüsse',
		val: '5'
	},{
		de: 'Soja',
		en: 'Soja',
		val: '6'
	},{
		de: 'Milchlaktose',
		en: 'Milchlaktose',
		val: '7'
	},{
		de: 'Schalenfrüchte',
		en: 'Schalenfrüchte',
		val: '8'
	},{
		de: 'Sellerie',
		en: 'Sellerie',
		val: '9'
	},{
		de: 'Senf',
		en: 'Senf',
		val: '10'
	},{
		de: 'Sesam',
		en: 'Sesam',
		val: '11'
	},{
		de: 'Schwefeldioxid',
		en: 'Schwefeldioxid',
		val: '12'
	},{
		de: 'Lupinen',
		en: 'Lupinen',
		val: '13'
	},{
		de: 'Weichtiere',
		en: 'Weichtiere',
		val: '14'
	}]

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
		ingredients:[],
		description: {
			de: '',
			en: ''
		}, 
		adds:[],
		specs: [],
		price: [{
			de: {
				name: 'Mitarbeiter',
				price: '3 EUR'
			}
		},{
			de: {
				name: 'Gast',
				price: '5 EUR'
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
				price: [{
			de: {
				name: 'Mitarbeiter',
				price: '3 EUR'
			}
		},{
			de: {
				name: 'Gast',
				price: '5 EUR'
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

	