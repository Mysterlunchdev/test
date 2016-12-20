var crypto = require('crypto');

module.exports = {
	createSalt: function() {
		return crypto.randomBytes(128).toString('base64');
	},

	hashpwd: function(salt, pwd) {
		
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(pwd).digest('hex');
	}, 

	hashtoken: function(salt, pwd) {
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(new Buffer(pwd, 'utf-8')).digest('hex');
	}
}