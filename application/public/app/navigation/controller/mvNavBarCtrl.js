/*
	functions as controller for signin in and out
	view navbar
*/

angular.module('app').controller('mvNavBarCtrl', function($window, $scope, $interval, $http, delegator, mvAuth, $location, $http, mvIdentity, mvNotifier) {
	// set identity for scope use
	$scope.identity = mvIdentity;
	console.log($scope.identity);
	/**
	 * signin function of scope
	 *
	 * @param String, String - username and password
	 */
	$scope.signin = function(username, password) {
		// authenticate user
		mvAuth.authenticateUser(username, password).then(function(success) {
			// if success notify and collapse dropdown if activated
			if (success) {
				mvNotifier.notify('You have been signed in');
				update();
				if ($rootScope.mobile) {
					$("#navbar_sc").collapse('hide');
				}
				// goto dashboard
				$location.path('/dashboard');
			} else {
				// else error
				mvNotifier.error('Nicht bestätigt oder falsche Eingabe!');
				$scope.tries++;
			}
		});
	}
	/**
	 * scope function for getting lost password
	 *
	 * @param String - email
	 */
	$scope.forgotPassword = function(email) {
		$scope.showpass = false;
		$http.post('/forgotpassword', {email: email}).
		  success(function(data, status, headers, config) {
		  	mvNotifier.notify("Mail gesendet");
		  }).
		  error(function(data, status, headers, config) {
		  	mvNotifier.notify("Mailadresse nicht bekannt");
		  	$scope.showPass = false;
		  });
	}
	/**
	 * Signs out the user by calling mvAuth logoutUser
	 * if successful reset scope username and password, notify user and relocate
	 *
	 */
	$scope.signout = function() {
		mvAuth.logoutUser().then(function() {
			// reset values in view
			$scope.username = "";
			$scope.password = "";
			// notify user
			mvIdentity=undefined;
			mvNotifier.notify('Ausgeloggt!');
			$window.location.href='/loggedout';
		});
	}

	// bootstrap set active for navbar
	$scope.isActive = function (viewLocation) { 
        return ($location.path().indexOf(viewLocation)>-1);
    };

});
