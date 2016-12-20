/**
 * resource for route /api/users/:section/:_id
 * route for inserting, getting, updating users
 */


angular.module('app').factory('mvUser', function($resource) {
	var userResource = $resource('/api/users/:section/:_id', {_id: "@id", section: "@section"},
	{
		get: {method: 'GET', isArray:true},
		getSingle: {method: 'GET', isArray: false},
		update: {method:'PUT', isArray:false},
	});

	userResource.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin')>-1;
	}

	return userResource;
});