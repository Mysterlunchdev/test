app.factory('Days', function($resource) {
	var res = $resource('/api/days/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});
app.factory('Official', function($resource) {
	var res = $resource('/api/user/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

app.factory('Meals', function($resource) {
	var res = $resource('/api/meal/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

app.factory('Ingredients', function($resource) {
	var res = $resource('/api/ingredients/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

app.factory('News', function($resource) {
	var res = $resource('/api/news/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

app.factory('Canteen', function($resource) {
	var res = $resource('/api/canteen/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

