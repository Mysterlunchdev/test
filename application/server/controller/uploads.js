var Busboy = require('busboy'),
	path = require('path'),
	request = require('request').defaults({ encoding: null }),
	helper = require('../utilities/helper'),
	fs = require('fs'),
	http = require('https'),
	crypto = require('crypto'),
	mongoose = require('mongoose'),
	user = mongoose.model('user'),
	// AWS = require('aws-sdk'),
	// gm = require('gm'),
	// size = require('request-image-size'),
	request = require('request');
	// gm = require('gm'),
	// size = require('request-image-size'),
	// startups = mongoose.model('startups');

module.exports = {
	readFile: function(req,res) {

	},
	uploadFiles: function(req,res) {
		// AWS.config.region = 'eu-central-1';
		// var s3bucket = new AWS.S3({params: {Bucket: 'defaultmean'}});

		// var busboy = new Busboy({ headers: req.headers });
		// req.pipe(busboy);
		// busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		// 	filename= filename.replace(/\s/g, '');
		// 	var id = generateUUID();
		// 	var cPath = req.params.id;
		// 	var s3obj = new AWS.S3({params: {Bucket: 'defaultmean', Key: cPath + '/' + filename }});
		// 	s3obj.upload({Body:file}, function(err,data) {
		// 		req.user.logo='https://s3.eu-central-1.amazonaws.com/defaultmean/promo/'+req.user._id+'/'+id+'.' +data.logo_basic.split('.').pop();
		// 		res.status(200).end();
		// 		console.log(err,data);
		// 	})


		// 	file.on('end', function() {
		// 		console.log('File [' + fieldname + '] Finished');
		// 	});
		// });
		// busboy.on('finish', function() {
		// 	console.log('Done parsing form!');
		// });

	},
	cutLogo: function(req,res) {
		// AWS.config.region = 'eu-central-1';
		// console.log(req.body);
		// var data = req.user;
		// var id = generateUUID();
		// 	if (!!data) {
		// 		var readStream = request(data.picture_basic);
		// 		var readStream2 = request(data.picture_basic);
		// 		http.get(data.picture_basic, function(resp) {

		// 			size(data.picture_basic, function(err,dimensions, length) {
						
		// 				var newW = dimensions.width * req.body.scale; var newH = dimensions.height * req.body.scale;
		// 				gm(resp)
		// 				.resize(newW, newH)
		// 			    .crop(req.body.w, req.body.h, req.body.x, req.body.y)
		// 			    .stream(function (err, stdout, stderr) {
		// 			    	console.log(err);
		// 			    	var id =generateUUID();
		// 					var s3obj = new AWS.S3({params: {Bucket: 'defaultmean', Key: id+'.' +data.picture_basic.split('.').pop()}});
		// 					data.picture = 'https://s3.eu-central-1.amazonaws.com/defaultmean/'+id+'.' +data.picture_basic.split('.').pop();
		// 					data.save();
		// 					s3obj.upload({Body:stdout}, function(err,data2) {
		// 						console.log(err,data2);
		// 						res.send({url:data.picture})
		// 						res.status(200).end();
		// 					})
		// 				});
		// 			})
		// 		})
		// 		console.log(data.logo_basic);
		// 		// readStream.pipe(fs.createWriteStream('t3est.'+data.logo_basic.split('.').pop()));
		// 		// gm(readStream)
		// 		// .size(function (err, size) {
		// 		// 	console.log(size);
		// 		//   if (!err)
				//     console.log(size.width > size.height ? 'wider' : 'taller than you');
				// })
			}
	},
	uploadPicture: function(req,res) {
		// AWS.config.region = 'eu-central-1';
	// 	var s3bucket = new AWS.S3({params: {Bucket: 'defaultmean'}});

	// 	var busboy = new Busboy({ headers: req.headers });
	// 	req.pipe(busboy);
	// 	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	// 		filename= filename.replace(/\s/g, '');
	// 		var id = generateUUID();
	// 		var cPath = req.params.id;
	// 		var s3obj = new AWS.S3({params: {Bucket: 'defaultmean', Key: cPath + '/' + id+'.'+filename.split('.').pop() }});
	// 		s3obj.upload({Body:file}, function(err,data) {
	// 			req.user.picture_basic='https://s3.eu-central-1.amazonaws.com/defaultmean/'+req.user._id+'/'+id+'.' +filename.split('.').pop();
	// 			req.user.save();
	// 			res.status(200).end();
	// 			console.log(err,data);
	// 		})


	// 		file.on('end', function() {
	// 			console.log('File [' + fieldname + '] Finished');
	// 		});
	// 	});
	// 	busboy.on('finish', function() {
	// 		console.log('Done parsing form!');
	// 	});
	// },
	// uploadLogoAndFulfill: function(req,res) {
	// 	AWS.config.region = 'eu-central-1';
	// 	var s3bucket = new AWS.S3({params: {Bucket: 'defaultmean'}});

	// 	var busboy = new Busboy({ headers: req.headers });
	// 	req.pipe(busboy);
	// 	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	// 		filename= filename.replace(/\s/g, '');
	// 		var id = generateUUID();
	// 		var cPath = req.params.id;
	// 		var s3obj = new AWS.S3({params: {Bucket: 'defaultmean', Key: cPath + '/' + filename }});
	// 		s3obj.upload({Body:file}, function(err,data) {
	// 			req.user.logo='https://s3.eu-central-1.amazonaws.com/defaultmean/promo/'+req.user._id+'/'+id+'.' +data.logo_basic.split('.').pop();
	// 			req.user.save();
	// 			console.log(err,data);
	// 		})


	// 		file.on('end', function() {
	// 			console.log('File [' + fieldname + '] Finished');
	// 		});
	// 	});
	// 	busboy.on('finish', function() {
			
	// 		// res.status(200).end();
	// 		console.log('Done parsing form!');
	// 	});

	},

}


function generateUUID(){
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
};

function getImageDirectoryByFullURL(url){
	return url.split('/').pop()
}