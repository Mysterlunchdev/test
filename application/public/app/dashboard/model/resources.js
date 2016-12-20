app.factory('Days', function($resource) {
	var res = $resource('http://localhost:6060/api/days/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

app.factory('Meals', function($resource) {
	var res = $resource('http://localhost:6060/api/meal/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

app.factory('Ingredients', function($resource) {
	var res = $resource('http://localhost:6060/api/ingredients/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
});

