/*
	identity object, identifies user and defines functions for easy use with object
	functions: 
		isAuthenticated - true if user is authenticated
		isAuthorized(role) - true if user is authorized with role
		hasCourse(id) - true if user has course with id
		hasGroup(id) - true if user has group with id
		getChats - returns users chats
		hasNewChat - updates Navbar if unread chat
		getCourseName / getGroupName - gives back the name for route
*/

angular.module('app').factory('mvIdentity', function($window, mvUser){
	var currentUser;
	if (!!window.bootstrappedUserObject) {
		currentUser = new mvUser();
		angular.extend(currentUser, $window.bootstrappedUserObject);
		// if (currentUser.colorcode!=undefined) {
		// 	console.log(currentUser.colorcode);
		// 	$(document).ready(function() {
		// 		$('.active > a').css('border-top-color', 'rgba('+currentUser.colorcode.r+','+currentUser.colorcode.g+','+currentUser.colorcode.b+',1)');
		// 		console.log($('.active > a').css('border-top-color'));
		// 		$('.innerElement').css('border-top-color','rgba('+currentUser.colorcode.r+','+currentUser.colorcode.g+','+currentUser.colorcode.b+',1)');
		// 		$('.navbar-default .navbar-nav > .active > a:hover').css('border-top-color', 'rgba('+currentUser.colorcode.r+','+currentUser.colorcode.g+','+currentUser.colorcode.b+')');
		// 		$('.navbar-default .navbar-nav > .active > a:focus').css('border-top-color', 'rgba('+currentUser.colorcode.r+','+currentUser.colorcode.g+','+currentUser.colorcode.b+')');
				
		// 	})
		// }
	}
	return {
		currentUser : currentUser,
		/**
		 * checks if user is auth
		 *
		 * @return  boolean
		 */
		isAuthenticated: function() {
			return !!this.currentUser;
		}
	}
});

/**
 * indexOf for Array with Objects
 *
 * @param [{object}] array - array of objects which is searched
 * @param String find - search for
 * @param String prop - property in object which should be found
 * @return Number
 */
function findInArray(array, find, prop) { 
	for (var i=0;i<array.length;i++) {
		if (array[i][prop]===find) {
			return i;
		}
	}
	return -1;
}


