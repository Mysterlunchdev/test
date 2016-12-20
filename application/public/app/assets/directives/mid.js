app.directive('midMargin', function($window) {
    return function(scope, element, attr) {
    	scope.onResize = function() {
                element.css('margin-left', element.parent()[0].offsetWidth/2-element[0].offsetWidth-14+'px');
            }
            scope.onResize();

            angular.element($window).bind('resize', function() {
                scope.onResize();
            })
      
    };
});