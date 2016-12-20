/**
 * author - Markus Kuhn
 * 
 *
 * serverinstance file
 */


var cluster = require('cluster');
var mailer = require('./application/server/utilities/mailer');
var numCPUs = require('os').cpus().length;
// const winston = require('winston');
// var logger = new winston.Logger({
//   levels: {
//     fatal: 4,
//     error: 3,
//     info: 2,
//     warn: 1,
//     debug: 0
//   }
// });
// winston.config.addColors({
//   fatal: 'blue',
//   error: 'red',
//   info: 'green',
//   warn: 'yellow',
//   debug: 'grey'
// });
//   logger.add(winston.transports.Console, { level: 'debug' });
//   logger.transports.console.colorize = true;
//   logger.log('silly', "127.0.0.1 - there's no place like home");
//   logger.log('debug', "127.0.0.1 - there's no place like home");
//   logger.log('verbose', "127.0.0.1 - there's no place like home");
//   logger.log('info', "127.0.0.1 - there's no place like home");
//   logger.log('warn', "127.0.0.1 - there's no place like home");
//   logger.log('error', "127.0.0.1 - there's no place like home");
//   logger.info("127.0.0.1 - there's no place like home");
//   logger.warn("127.0.0.1 - there's no place like home");
//   logger.error("127.0.0.1 - there's no place like home");
// cluster workers
if (cluster.isMaster) {
  // Fork workers.
  if (!!process.env.TMP) {
  	cluster.fork();
  } 
  else {
	for (var i = 0; i < numCPUs; i++) {
		console.log("running server " + i);
		cluster.fork();
	}
  }

  cluster.on('exit', function(worker) {
    console.log('worker %s died. restart...', worker.process.pid);
    // mailer.alarm('worker restart');
    cluster.fork();
  });
} else {


 /**
  * module dependencies
  */
// process env
var env = 'production';
// require express
var express = require('express');
// expose router to app
var router = express.Router();
// create app
var app = express();
// define server
var http = require('http').Server(app);
// get config variables
var config = require('./application/server/setup/config')[env];
// connect with database
var db = require('./application/server/setup/mongoose')(config, function (err, db) {
// app.enable('view cache');

// 
app.disable('view cache');
// app.use(require('connect-livereload')());
// cache=false;
	if (err!=null) {
		// if error
		app.listen(config.port, function() {
			console.log("magic happens on port "+ config.port);
			
		});
		var passport = require('./application/server/setup/expressdown')(app, config, db);
		app.get('/', function(req,res) {
			res.render('down');
		})
	}
	if (db!=null) {
		// if db is connected
		var passport = require('./application/server/setup/express')(app, config, db);
		require('./application/server/setup/passport')(passport);
		var routes = require('./application/server/setup/routes')(router);
		app.use('/',routes);
		app.listen(config.port, function() {
			console.log("magic happens on port "+ config.port);
		});
				

		/// catch 404 and forwPard to error handler
		app.use(function(req, res, next) {
		    var err = new Error('Not Found');
		    err.status = 404;
		    next(err);
		});

		// development error handler
		// will print stacktrace
		if (app.get('env') === 'development') {
		    app.use(function(err, req, res, next) {
		        res.status(err.status || 500);
		        res.render('error', {
		            message: err.message,
		            error: err
		        });
		    });
		}
		
	}
});

}