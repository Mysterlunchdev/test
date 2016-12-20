
var express = require('express'),
	stylus = require('stylus'),
	logger = require('morgan'),
	path = require('path'),
	passport = require('passport'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	// mongoose = require('mongoose'),
	// MongoStore = require('connect-mongo-store')(express),
	MongoStore = require('connect-mongo')(session),
	bodyParser = require('body-parser');
	var favicon = require('serve-favicon');

	
module.exports = function(app, config, db) {

	function compile(str, path) {
		return stylus(str).set('filename', path);
	}

	app.use(logger('dev'));
	app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
	app.set('views', path.join(config.rootPath, 'server/views')); 
	app.set('view engine', 'jade');
	app.use(stylus.middleware( {
		src: config.rootPath + '/public',
		compile: compile
	}));
	app.use(express.static(config.rootPath +'/public'));
	app.use(favicon(config.rootPath + '/public/favicon.ico'));
	app.use(cookieParser());
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control, Authorization, x-access-token");
		next();
	});

	return passport;
}