/**
 * notify the user with toastr
 */


angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr) {
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
});