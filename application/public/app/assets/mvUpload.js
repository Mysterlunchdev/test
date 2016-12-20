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