var mongoose = require('mongoose'),
	fs= require('fs'),
	path=require('path');
	// apn = require('apn');

self = {
 // 	pushNotification: function(id, mail, message) {
	// 	console.log("push");
		
	// 	mails.findOne({_consultid:id}).exec(function(err,data) {
	// 		if (data) {
	// 			var index = module.exports.findInArray(data.contacts, mail, "email");
	// 			if (index!=-1) {
	// 				for (var i = 0 ; i < data.contacts[index].device.length;i++) {
	// 					console.log("found id");
	// 					if (data.contacts[index].device[i].oS==0) return;
	// 					var token = data.contacts[index].device[i].token; 
	// 					var options = {
	// 						production: true,
	// 						cert: 'certproduction.pem',
	// 						key: 'keyproduction.pem'
	// 					};

	// 				    var apnConnection = new apn.Connection(options);

	// 				    var myDevice = new apn.Device(token);
	// 				    var note = new apn.Notification();

	// 					note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	// 					note.sound = "default";
	// 					note.alert = message;
	// 					// note.payload = {'messageFrom': 'Caroline'};

	// 					apnConnection.pushNotification(note, myDevice);

	// 					var options = {
	// 						production: false,
	// 						cert: 'cert.pem',
	// 						key: 'key.pem'
	// 					};

	// 				    var apnConnection = new apn.Connection(options);

	// 				    var myDevice = new apn.Device(token);
	// 				    var note = new apn.Notification();

	// 					note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	// 					note.sound = "default";
	// 					note.alert = message;
	// 					// note.payload = {'messageFrom': 'Caroline'};

	// 					apnConnection.pushNotification(note, myDevice);
	// 				}					
	// 			}
	// 		}
	// 	})


	// },
	findInArray: function(array, find, prop) {
		if (array==undefined) return -1;
		for (var i=0;i<array.length;i++) {
			
			if (array[i]!=undefined)
				if (array[i][prop]==find) {
					return i;
				}
		}
		return -1;
	},
	findInArrayDate: function(array, find, prop) {
		if (array==undefined) return -1;
		for (var i=0;i<array.length;i++) {
			
			var date1 = new Date(find);
			var date2 = new Date(array[i][prop]);
			if (date1.getTime()==date2.getTime()) {
				return i;
			}
		}
		return -1;
	}

}

module.exports = self; 