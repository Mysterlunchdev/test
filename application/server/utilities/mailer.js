var nodemailer = require('nodemailer'),
	fs = require('fs'),
	config = require('./mails/config'),
	smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
	sendEmail: function(mail, user, event) {
		// var mail=new language.mail(user, val);
		var options = config;
		var options2 = {
			encoding: 'String'
		}
		fs.readFile('./application/server/utilities/mails/mailing.html', 'utf8', function(err,data) {
			if (err) {
				console.log("error", err.toString());
				return;
				
			}
			fs.readFile('./application/server/utilities/mails/'+mail+'.html', 'utf8', function(err,data2) {
				var subject = 'Info';
				var subject2 = 'Herzlich Willkommen';
				var string = data.replace(/\(TEXT\)/g, data2);
				string = string.replace(/\(CODE\)/g, user.code);
				string = string.replace(/\(USERCODE\)/g, user.activationCode);
				string = string.replace(/\(EMAIL\)/g, user.email);
				string = string.replace(/\(LINK\)/g, '');

				var mailfrom = 'support@promo-match.de';
				console.log(mailfrom);
				console.log("sending mail", user.email);
				var transporter = nodemailer.createTransport(smtpTransport(options));
				transporter.sendMail({
					from: mailfrom,
					to: user.email,
					subject: subject,
					html: string
					// ,
					// attachments: [{
					// 	filename: 'g.png',
					// 	path: '/mails/img/g.png',
					// 	cid: 'p1'
					// }]
				}, function(err) {
					console.log("abschluss");
					if (err) {
						console.log("error", err.toString());
						return null;
					}
					console.log("alles gut beim versenden");
					
				})
				
				
			})
		})
 	}
}

