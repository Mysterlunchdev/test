app.controller('ProfileCtrl', function($scope, $routeParams, $http, FileUploader, mvNotifier, mvUser,  delegator, mvIdentity) {
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
})