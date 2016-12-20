app.directive('heightNgRepeat', function($timeout) {
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
});

app.directive('sameHeight', function($timeout) {
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
});