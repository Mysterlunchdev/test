/**
 * author - Markus Kuhn
 *
 * mongoose configuraion and starting file
 */

var mongoose = require('mongoose'),
	// mailer = require('../utilities/mailer'),
	allmodels = require('./allmodels');

module.exports = function(config, callback) {
	var options = { 
		server: { 
			socketOptions: { 
				keepAlive: 1, connectTimeoutMS: 3000 
			}, 
			auto_reconnect:true 
		}, 
        replset: { 
        	socketOptions: { 
        		keepAlive: 1, connectTimeoutMS : 3000 
        	}, auto_reconnect:true 
        } 
    }; 
    
	// mongoose.connect(config.db, options, function(err) {
	// 	if (err) {
	// 		console.log(err.toString());
			
	// 		callback(new Error("no connection"), null);
	// 		console.log("callback error");
			
	// 	}
	// });

	
	console.log("cfiG", config);
	var connectWithRetry = function() {
		var db = mongoose.connection;
		// db.on('connecting', console.log("verbinden"));
		db.on('error', function cb() {
			// mailer.alarm('DB CONNECT');
			console.log('connection error...');
		})
		db.once('open', function cb() {
			console.log('db openend');
			callback(null, db);
		});
	  return mongoose.connect(config.db, options, function(err) {
	    if (err) {
	      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
	      // mailer.alarm('DB CONNECT');
	      setTimeout(connectWithRetry, 5000);
	    }
	  });
	};
	connectWithRetry();

}	

