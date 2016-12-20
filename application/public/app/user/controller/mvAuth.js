/*
	factory for authentication, which interacts with the server for some controllers
	with $resource and $http module
*/

angular.module('app').factory('mvAuth', function($http, mvUser, mvIdentity, $q) {
	return {
		/*
			authenticates user and sets mvIdentity
			call indicated by MvNavBarCtrl and mvSignupCtrl
			views are signup and navbar
		*/
		authenticateUser: function(username, password) {
			var dfd = $q.defer();
			// POST to /login for authentication
			$http.post('/login', {username: username, password:password}).then(function(response) {
			// authentication is successful
				if (response.data.success) { 
					var user = new mvUser();
					angular.extend(user, response.data.user);
					mvIdentity.currentUser = user;
					dfd.resolve(true);
				} else {
					dfd.resolve(false);					
				}
			});  
			return dfd.promise;
		},
		/*
			logs user out of the system
			indicated by mvNavBarCtrl
			view is navbar
		*/
		logoutUser: function() {
			var dfd = $q.defer();
			$http.post('/logout', {logout:true}).then(function() {
				mvIdentity.currentUser = undefined;
				dfd.resolve();
			});
			return dfd.promise;
		}
	}


})

