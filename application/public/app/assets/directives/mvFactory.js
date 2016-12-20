/**
 * factory which replaces all own factories for communication with server
 * call Method like POST and insert Params data, the resource and the route
 * example: delegator.POST({id:number}, mvResource, "/api/example")
 */

angular.module('app').factory('delegator', function($q) {
	return {
		// POST route
		POST: function(data, resource, routeoptions) {
			// defer
			var dfd = $q.defer();
			// create new resource with data
			var object = new resource(data);
			console.log("werde jetzt gleich speichern");
			console.log("routeoptions", routeoptions);
			
			// sending post to server
			object.$save(routeoptions).then(function(response) {
				// is status is ok
				dfd.resolve(response);
				console.log("alles gut response: ", response);
			}, function(response) {
				// if status is not okay
				console.log("nicht alles gut ", response);
				dfd.reject(response.data.reason);
			})
			return dfd.promise;
		},
		PUT: function(data, resource, routeoptions) {
			// defer
			var dfd = $q.defer();
			// create new resource with data
			var object = new resource(data);
			console.log("werde jetzt gleich speichern");
			
			// sending post to server
			object.$update(routeoptions).then(function(response) {
				// is status is ok
				dfd.resolve(response);
				console.log("alles gut response: ", response);
			}, function(response) {
				// if status is not okay
				console.log("nicht alles gut ", response);
				dfd.reject(response.data.reason);
			})
			return dfd.promise;
		},
		PUTresource: function(object, resource, routeoptions) {
			// defer
			var dfd = $q.defer();
			// create new resource with data
			console.log("werde jetzt gleich speichern");
			console.log(object);
			// sending post to server
			object.$update(routeoptions).then(function(response) {
				// is status is ok
				dfd.resolve(response);
				console.log("alles gut response: ", response);
			}, function(response) {
				// if status is not okay
				console.log("nicht alles gut ", response);
				dfd.reject(response.data.reason);
			})
			return dfd.promise;
		},
		DELETE: function(data, resource, routeoptions) {
			// defer
			var dfd = $q.defer();
			// create new resource with data
			var object = new resource(data);
			console.log("werde jetzt gleich speichern");
			
			// sending post to server
			object.$delete(routeoptions).then(function(response) {
				// is status is ok
				dfd.resolve(response);
				console.log("alles gut response: ", response);
			}, function(response) {
				// if status is not okay
				console.log("nicht alles gut ", response);
				dfd.reject(response.data.reason);
			})
			return dfd.promise;
		}
	}

})