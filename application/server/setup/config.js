/**
 * author - Markus Kuhn
 * copyright 360 OPG GmbH Essen
 *
 * config file 
 */

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');


module.exports = {
	production: {
		// db : 'mongodb://127.0.0.1:27017/default',
		// db: 'mongodb://user:usertest@ds011664.mlab.com:11664/default_mean',
		db: 'mongodb://user:usertest@ds151060.mlab.com:51060/mahlzeit',
		rootPath: rootPath,
		mails: true,
		port:  process.env.PORT || 6060,
	}
}

process.env.AWS_ACCESS_KEY_ID='AKIAJMGF2F2BOAN4DE7A'
process.env.AWS_SECRET_ACCESS_KEY='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'