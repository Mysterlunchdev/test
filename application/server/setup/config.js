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
		// db: 'mongodb://user:usertest@ds151060.mlab.com:51060/mahlzeit',
		db: 'mongodb://user:usertest@ds161012.mlab.com:61012/bmwmahlzeit',
		// db: 'mongodb://user:usertest@ds111754.mlab.com:11754/devmahlzeit',
		// db: 'mongodb://user:usertest@ds161793.mlab.com:61793/ronmahlzeit',
		rootPath: rootPath,
		mails: true,
		port:  process.env.PORT || 6060,
	}
}

process.env.AWS_ACCESS_KEY_ID='AKIAJMGF2F2BOAN4DE7A'
process.env.AWS_SECRET_ACCESS_KEY='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'