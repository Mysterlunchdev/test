app.factory('Days', function($resource) {
	var res = $resource('/api/days/:id', {id:"@id"},
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

