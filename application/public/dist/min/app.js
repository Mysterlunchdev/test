
/**
 * @ngdoc overview
 * @name app
 *
 * @description
 * App for Mahlzeit. Here the user can push ingredients, meals and days
 *
 * This is the official Application for mahlzeit. Cantine app.
 *
 * Routing:
 * main - MainCtrl - / 
 */

app = angular.module('app', ['ngResource', 'ngRoute','angularFileUpload']);

// if logged out intercept the call and logout
app.factory('AuthInterceptor', ["$q", "$window", function($q, $window) {
      return {

        responseError: function(responseError) {
              if (responseError.status === 401 || responseError.status === 403) { // authentication issue
                    $window.location.href='/autologgedout';
              } 
              return $q.reject(responseError);
        }
     };
 }])



app.config(["$routeProvider", "$locationProvider", "$httpProvider", function($routeProvider, $locationProvider, $httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');

	var routeRoleChecks = {
		// user: {auth: function(mvAuth) {
		// 	return mvAuth.authorizedCurrentUserForRoute('');
		// }}
	}



	// check if mobile
	var _isNotMobile = (function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return !check;
    })();


	// $translateProvider.useStaticFilesLoader({
	// 	prefix: '/language/lang-',
	// 	suffix: '.json'
	// })
	// // Nicht vergessen: die Standardsprache
	// $translateProvider.preferredLanguage('de');

	// $translateProvider.useLocalStorage();

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});

	// preventive mobilecheck
	// if (_isNotMobile) {
		$routeProvider
			// START
			.when('/', { templateUrl : '/partials/dashboard/view/main',
				controller: 'MainCtrl'
			})
			.when('/profile', { templateUrl : '/partials/user/view/profile',
				controller: 'ProfileCtrl'
			})
			.otherwise({ redirectTo: '/' });
	// } else {
	// 	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '/css/siteMobile.css') );
	// 	$routeProvider
	// 		// START
	// 		.when('/', { templateUrl : '/partials/main/main_mobile',
	// 			controller: 'mvMainCtrl'
	// 		})
	// 		.otherwise({ redirectTo: '/' });
	// }

}]);

// configure what happens on error
app.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
		if(rejection ==='not authorized') {
			$location.path('/');
		}
	});
}]);

// scroll to tap if routechange succeeded
app.run(["$rootScope", "$location", "$anchorScroll", function($rootScope, $location, $anchorScroll) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    if($location.hash()) $anchorScroll();  
  });
}]);


// define backbutton
app.run(["$rootScope", "$window", function($rootScope, $window) {
    $rootScope.globalBack = function() {
         $window.history.back();
    };
}]);
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66839132-1', 'auto');


app.factory('mvUpload', function() {
	return {
		upload:function(clientid, consultid, file) {
			var fd = new FormData();
			var file = file;
			fd.append('file', file);
			var xmlhttp;
			if (window.XMLHttpRequest)
			{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else
			{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.open('POST', '/api/upload/file/'+consultid+'/'+ id, true);
			xmlhttp.onload = function(response) {
				var data = {
					name: file.name,
					description: $scope.descriptionfile
				}
				if (xmlhttp.status===201) {
					data.name = response.target.responseText;
					console.log("copy erstellt", response.target.responseText);
					mvNotifier.notify("Dateiname angepasst");
					
				}
				if (xmlhttp.status===400) {
					mvNotifier.error("Bitte den Dateinamen ändern!");
					return;
				}
				return true;
				
			}
			xmlhttp.send(fd);
			
		}
	}
})
app.directive('backButton', function () {
    return {
        restrict: 'E',
        template: '<button class="btn bgColor"><i class="fa fa-arrow-left def-font-color"></i></button>',
        scope: {
            back: '@back',
            icons: '@icons'
        },
        link: function(scope, element, attrs) {
            $(element[0]).on('click', function() {
                history.back();
                scope.$apply();
            });
        }
    };
});
app.directive('centerMiddle', ["$timeout", function($timeout) {
	return {
		link: function(scope, element, attrs) {
			// iteration is complete, do whatever post-processing
			// is necessary
			// $timeout(function() {
			// 	$timeout(function(){
			// 		setInterval(function() {
			// 			console.log("timeouet ");
						
			// 			console.log(element.prop('offsetHeight'));
			// 		},1000);

			// 		// var height = element.parent().parent()[0].offsetHeight/2-element.offsetHeight/2;
			// 		// element.css('margin-top', height +'px');
					
			// 	},0)
			
			// },0)
			
		}
	}
}]);

/**
 * template for date
 */

app.directive('dateShow', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'Am {{ date | date : "dd.MM.yyyy \'um\'  H:mm"}} Uhr'
	};
});

app.directive('dateShowMessages', function() {
	return {
		scope: {
			date: '@'
		},
		template: '{{ date | date : "dd.MM.yyyy"}} <br>{{ date | date : "H:mm"}} Uhr'
	};
});

app.directive('dateShowSimple', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'Am {{ date | date : "dd.MM.yyyy"}}'
	};
});

app.directive('dateShowTime', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'Um {{ date | date: "H:mm"}} Uhr'
	};
});

app.directive('dateShowPackage', function() {
	return {
		scope: {
			date: '@'
		},
		template: 'bis {{ date | date : "dd.MM.yyyy"}}'
	};
});

app.directive('dateShowTimeSingle', function() {
	return {
		scope: {
			date: '@'
		},
		template: '{{ date | date: "H:mm"}}'
	};
});
/**
 * templatedirective for file attachments 
 */

angular.module('app').directive('fileAttachment', function() {
	return {
		templateUrl: '/partials/common/directives/fileAttachment'
	};
});
/**
 * parses file input
 */

angular.module('app').directive('fileInput',['$parse', function($parse) {
	return {
		restrict: 'A',
		link:function(scope,elm,attrs) {
			elm.bind('change', function() {
				$parse(attrs.fileInput).assign(scope,elm[0].files)
				scope.$apply();
			})
		}
	} 
}])
/**
 * directive parsing the input to model
 */

angular.module('app').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
app.directive('heightNgRepeat', ["$timeout", function($timeout) {
  return function(scope, element, attrs) {
    if (scope.$last){
      // iteration is complete, do whatever post-processing
      // is necessary
      $timeout(function() {
      	$timeout(function() {
		      var children = element.parent().children();
		      var maxArr = [];
		      
		      for (var i = 0; i < children.length;i++) {
		      	console.log(children[i].offsetHeight);
		      	
		      	maxArr.push(children[i].offsetHeight);
		      }
		      console.log(maxArr);
		      var max = Math.max.apply(Math, maxArr);
		      element.parent().children().children().css('min-height', max+'px');
	      	
      		
      	})
      })
      
    }
  };
}]);

app.directive('sameHeight', ["$timeout", function($timeout) {
  return function(scope, element, attrs) {
      // iteration is complete, do whatever post-processing
      // is necessary
      console.log(element.parent());
      
      $timeout(function() {
      		console.log("timeout");
      		
	      var children = element.parent().children();
	      var maxArr = [];
	      
	      for (var i = 0; i < children.length;i++) {
	      	console.log(children[i].offsetHeight);
	      	
	      	maxArr.push(children[i].offsetHeight);
	      }
	      console.log(maxArr);
	      var max = Math.max.apply(Math, maxArr);
	      element.parent().children().children().css('min-height', max+'px');
      	
      })
      
  };
}]);
/**
 * filter shows if the date of input is older than actual time
 * used for meetings - why show old meetings?
 */
app.filter('isOlder', function() {
    return function(input) {
        var tmp = [];
        
    	if (input!=undefined) {
            for (var i=0;i<input.length;i++) {
                var d = new Date();
                var d2 = new Date(input[i].date);
                d = new Date(d.getFullYear(), d.getMonth(),d.getDate());
                d2 = new Date(d2.getFullYear(), d2.getMonth(),d2.getDate());
                console.log(d,d2);
                
                if (d.getTime()<=d2.getTime()){ 
                    tmp.push(input[i]);

                }
            }
            return tmp;
    	} else {
    		return [];
    	}
    }
});
app.directive('midMargin', ["$window", function($window) {
    return function(scope, element, attr) {
    	scope.onResize = function() {
                element.css('margin-left', element.parent()[0].offsetWidth/2-element[0].offsetWidth-14+'px');
            }
            scope.onResize();

            angular.element($window).bind('resize', function() {
                scope.onResize();
            })
      
    };
}]);
/**
 * factory which replaces all own factories for communication with server
 * call Method like POST and insert Params data, the resource and the route
 * example: delegator.POST({id:number}, mvResource, "/api/example")
 */

angular.module('app').factory('delegator', ["$q", function($q) {
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

}])
/**
 * notify the user with toastr
 */


angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', ["mvToastr", function(mvToastr) {
	return {
		notify: function(msg) {
			mvToastr.success(msg);
			console.log(msg);
		},
		error: function(reason) {
			if (reason==undefined || reason=='') reason="Fehler nicht vorhanden. Der Server könnte abgestürzt sein. Bitte Seite neu laden.";
			mvToastr.error(reason);
			console.log(reason);
		}
	}
}]);
app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                scope.$eval(attrs.ngEnter);
                        });
                        
                        event.preventDefault();
                }
            });
        };
});
app.directive('scrollToLast', ["$location", "$anchorScroll", function ($location, $anchorScroll) {
  return function(scope, element, attrs) {

    element.bind('click', function(event) {
        event.stopPropagation();
        var off = scope.$on('$locationChangeStart', function(ev) {
            off();
            ev.preventDefault();
        });
        var location = attrs.scrollTo;
        $location.hash(location);
        $anchorScroll();
    });

  };
}]);
angular.module('ui.tinymce', [])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
      priority: 10,
      require: 'ngModel',
      link: function (scope, elm, attrs, ngModel) {
        var expression, options, tinyInstance,
          updateView = function () {
            ngModel.$setViewValue(elm.val());
            if (!scope.$root.$$phase) {
              scope.$apply();
            }
          };

        // generate an ID if not present
        if (!attrs.id) {
          attrs.$set('id', 'uiTinymce' + generatedIds++);
        }

        if (attrs.uiTinymce) {
          expression = scope.$eval(attrs.uiTinymce);
        } else {
          expression = {};
        }

        // make config'ed setup method available
        if (expression.setup) {
          var configSetup = expression.setup;
          delete expression.setup;
        }

        options = {
          // Update model when calling setContent (such as from the source editor popup)
          setup: function (ed) {
            var args;
            ed.on('init', function(args) {
              ngModel.$render();
              ngModel.$setPristine();
            });
            // Update model on button click
            ed.on('ExecCommand', function (e) {
              ed.save();
              updateView();
            });
            // Update model on keypress
            ed.on('KeyUp', function (e) {
              ed.save();
              updateView();
            });
            // Update model on change, i.e. copy/pasted text, plugins altering content
            ed.on('SetContent', function (e) {
              if (!e.initial && ngModel.$viewValue !== e.content) {
                ed.save();
                updateView();
              }
            });
            ed.on('blur', function(e) {
                elm.blur();
            });
            // Update model when an object has been resized (table, image)
            ed.on('ObjectResized', function (e) {
              ed.save();
              updateView();
            });
            if (configSetup) {
              configSetup(ed);
            }
          },
                mode: 'exact',
                plugins: "link",
                entity_encoding : 'named',
                menubar: false,
                statusbar: false,
                toolbar: "bold italic underline alignleft aligncenter alignright styleselect fontsizeselect bullist numlist removeformat",
                elements: attrs.id
        };
        // extend options with initial uiTinymceConfig and options from directive attribute value
        angular.extend(options, uiTinymceConfig, expression);
        setTimeout(function () {
          tinymce.init(options);
        });

        ngModel.$render = function() {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
          if (tinyInstance) {
            tinyInstance.setContent(ngModel.$viewValue || '');
          }
        };

        scope.$on('$destroy', function() {
          if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
          if (tinyInstance) {
            tinyInstance.remove();
            tinyInstance = null;
          }
        });
      }
    };
  }]);


/**
 * own module for tinymce
 * use by <div data-ui-tinymce class="identifier">
//  */

// angular.module('ui.tinymce', [])
//     .value('uiTinymceConfig', {})
//     .directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
//     uiTinymceConfig = uiTinymceConfig || {};
//     var generatedIds = 0;
//     return {
//         require: 'ngModel',
//         link: function(scope, elm, attrs, ngModel) {
//             var expression, options, tinyInstance;
//             // generate an ID if not present
//             if (!attrs.id) {
//                 attrs.$set('id', 'uiTinymce' + generatedIds++);
//             }
//             options = {
//                 // Update model when calling setContent (such as from the source editor popup)
//                 setup: function(ed) {
//                     ed.on('init', function(args) {
//                         ngModel.$render();
//                     });
//                     // Update model on button click
//                     ed.on('ExecCommand', function(e) {
//                         console.log("exec command");
                        
//                         ed.save();
//                         ngModel.$setViewValue(elm.val());
//                         if (!scope.$$phase) {
//                             scope.$apply();
//                         }
//                     });
//                     // Update model on keypress
//                     ed.on('KeyUp', function(e) {
//                         ed.save();
//                         ngModel.$setViewValue(elm.val());
//                         if (!scope.$$phase) {
//                             scope.$apply();
//                         }
//                     });
//                 },
//                 mode: 'exact',
//                 entity_encoding : 'named',
//                 menubar: false,
//                 statusbar: false,
//                 elements: attrs.id
//             };
//             if (attrs.uiTinymce) {
//                 expression = scope.$eval(attrs.uiTinymce);
//             } else {
//                 expression = {};
//             }
//             angular.extend(options, uiTinymceConfig, expression);
//             setTimeout(function() {
//                 tinymce.init(options);
//             });


//             ngModel.$render = function() {
//                 if (!tinyInstance) {
//                     tinyInstance = tinymce.get(attrs.id);
//                 }
//                 if (tinyInstance) {
//                     tinyInstance.setContent(ngModel.$viewValue || '');
//                 }
//             };
//         }
//     };
// }]); 
/**
 * @ngdoc controller
 * @name app.controller:MainCtrl
 * @scope
 *
 * @description
 * Main Controller for application
 *
 */

app.controller('MainCtrl', ["$scope", "Official", "Canteen", "News", "delegator", "Meals", "Ingredients", "Days", "$window", "$location", "mvIdentity", "mvNotifier", function($scope, Official, Canteen, News, delegator, Meals, Ingredients, Days, $window, $location, mvIdentity, mvNotifier) {
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


}])

	
app.factory('Days', ["$resource", function($resource) {
	var res = $resource('/api/days/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
}]);
app.factory('Official', ["$resource", function($resource) {
	var res = $resource('/api/user/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
}]);

app.factory('Meals', ["$resource", function($resource) {
	var res = $resource('/api/meal/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
}]);

app.factory('Ingredients', ["$resource", function($resource) {
	var res = $resource('/api/ingredients/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
}]);

app.factory('News', ["$resource", function($resource) {
	var res = $resource('/api/news/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
}]);

app.factory('Canteen', ["$resource", function($resource) {
	var res = $resource('/api/canteen/:id', {id:"@id"},
	{
		get: {method: 'GET', isArray:false},
		getSingle: {method: 'GET', isArray: true},
		update: {method:'PUT', isArray:false},
	});

	

	return res;
}]);


/*
	functions as controller for signin in and out
	view navbar
*/

angular.module('app').controller('mvNavBarCtrl', ["$window", "$scope", "$interval", "$http", "delegator", "mvAuth", "$location", "$http", "mvIdentity", "mvNotifier", function($window, $scope, $interval, $http, delegator, mvAuth, $location, $http, mvIdentity, mvNotifier) {
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

}]);

/*
	factory for authentication, which interacts with the server for some controllers
	with $resource and $http module
*/

angular.module('app').factory('mvAuth', ["$http", "mvUser", "mvIdentity", "$q", function($http, mvUser, mvIdentity, $q) {
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


}])


app.controller('ProfileCtrl', ["$scope", "$routeParams", "$http", "FileUploader", "mvNotifier", "mvUser", "delegator", "mvIdentity", function($scope, $routeParams, $http, FileUploader, mvNotifier, mvUser,  delegator, mvIdentity) {
	$scope.user = mvIdentity.currentUser;
	var user = mvIdentity.currentUser;
	$scope.uploader = new FileUploader();
	$scope.uploader6 = new FileUploader();
	console.log(user);
	console.log(mvIdentity);
	if ($routeParams.first!=undefined) {
		$scope.noIban=true;
	}


	$scope.$watch('myFile6', function() {
		$scope.uploader6.url='/api/upload/'+mvIdentity.currentUser._id;
		$('#thepicture').guillotine('remove');
		$scope.uploader6.uploadAll();
	})

		$('#thepicture').load(function() {
		console.log("loaded");
		var picture = $('#thepicture');
		picture.guillotine({width: 200, height: 200, scale:0.01, onChange: function(data, action){
		   	console.log("change", data);
		  }
		});
		$('#zoom-in-button').click(function(){
			console.log("click");
			
		  picture.guillotine('zoomIn');
		});
		$('#zoom-out-button').click(function(){
			console.log("click");
			
		  picture.guillotine('zoomOut');
		});
		for (var i =0;i<30;i++) {
			  picture.guillotine('zoomOut');

		}
	})

	$('#thepicture').on('guillotinechange', function(ev, data, action){
  // this = current element
  // ev = event object
  // data = { scale: 1.4, angle: 270, x: 10, y: 20, w: 400, h: 300 }
  console.log(ev, data, action);
  // action = drag/rotateLeft/rotateRight/center/fit/zoomIn/zoomOut
  // Save data on hidden inputs...
});

	$scope.uploader6.onCompleteAll = function() {
		mvUser.getSingle({},function(data) { 
			angular.extend(mvIdentity.currentUser, data.user);
			$scope.uploader6.clearQueue();
			$('#thepicture').load(function() {
				console.log("loaded");
				var picture = $('#thepicture');
				picture.guillotine({width: 200, height: 200, scale:0.01});
				picture.guillotine({
				  onChange: function(data, action){
				   	console.log(data);
				   	
				  }
				});
				$('#zoom-in-button').click(function(){
					console.log("click");
					
				  picture.guillotine('zoomIn');
				});
				$('#zoom-out-button').click(function(){
					console.log("click");
					
				  picture.guillotine('zoomOut');
				});


			})
			$scope.myFile5=undefined;
	        console.info('onCompleteAll bei six');
		})
        // $scope.uploader4.clearQueue();
    };

    $scope.cut = function() {
		console.log("bin in cut");
		$http.put('/cut/', $('#thepicture').guillotine('getData')).then(function(data) {
			console.log("bin durch mit cut", data);
			$scope.user.picture=data.data.url;
		})
	}

	$scope.update = function() {
		delegator.PUT(mvIdentity.currentUser, mvUser, {}).then(function(data) {
			mvNotifier.notify("Successfully updated");
			angular.extend(mvIdentity.currentUser, data.user);
			$route.reload();
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}

	$scope.checkCostume = function(index2) {
		var index = findInArray(user.costume, index2, "val");
		if (index>-1) {
			user.costume.splice(index,1);
		} else {
			user.costume.push({val:index2,wouldWear:true});
		}
	}
	$scope.checkStyleCostume = function(index) {	
		var index = findInArray(user.costume, index, "val");
		if (index>-1) {
			return true;
		} else {
			return false;
		}
	}

	$scope.uploader.url='/api/upload/'+mvIdentity.currentUser._id;

	$scope.uploader.onCompleteAll = function() {
		mvUser.getSingle({},function(data) { 
			angular.extend(mvIdentity.currentUser, data.user);
			$scope.uploader.clearQueue();
		})
    };
     $scope.$watch('myFile5', function() {
		$scope.uploader.uploadAll();
	})
}])
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

angular.module('app').factory('mvIdentity', ["$window", "mvUser", function($window, mvUser){
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
}]);

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



/**
 * resource for route /api/users/:section/:_id
 * route for inserting, getting, updating users
 */


angular.module('app').factory('mvUser', ["$resource", function($resource) {
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
}]);