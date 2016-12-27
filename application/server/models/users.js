/**
 * author - Markus Kuhn
 *
 * 
 */


var mongoose = require('mongoose'),
    crypt = require('../utilities/encryption');

var createSchema = mongoose.Schema({
    _secondid: mongoose.Schema.ObjectId,
    name: String, 
    email: {
        type: String,
    },
    salt: String,
    activated: Boolean,
    hashed_pwd: String,
    rights: Number,
    firstName: String,
    lastName: String,
    code: String,
    url: String,
});


createSchema.methods = {
    authenticate: function(passwordToMatch) {
        var pwddb = this.hashed_pwd;
        var pwd_in = crypt.hashpwd(this.salt, passwordToMatch);
        console.log(pwddb + " " + pwd_in);
        return pwddb === pwd_in;
    }
};

createSchema.index({email:1})
var create = mongoose.model('user', createSchema);

var createSchema = mongoose.Schema({
    name: {
        de: String,
        en: String
    }
});



// createSchema.index({email:1})
var create = mongoose.model('ingredients', createSchema);


var createSchema = mongoose.Schema({
    name: {
        de: String,
        en: String
    },
    ingredients: [{
        de: String,
        en: String
    }],
    description: {
        de: String,
        en: String
    },
    specs: [{
        de: String,
        en: String,
        val: Number
    }],
    picture: String,
    price: [{
        de: {
            name: String,
            price: String,
        },
        en: {
            name: String,
            price: String,
        }
    }],
    fav: Number
});



// createSchema.index({email:1})
var create = mongoose.model('meals', createSchema);


var createSchema = mongoose.Schema({
    day: Date,
    _mealid: mongoose.Schema.ObjectId,
    number: Number,
    name: {
        de: String,
        en: String
    },
    ingredients: [{
        de: String,
        en: String
    }],
    description: {
        de: String,
        en: String
    },
    specs: [{
        de: String,
        en: String,
        val: String,
    }],
    picture: String,
    price: [{
        de: {
            name: String,
            price: String,
        },
        en: {
            name: String,
            price: String,
        }
    }],
    fav: Number
});



// createSchema.index({email:1})
var create = mongoose.model('days', createSchema);
var createSchema = mongoose.Schema({
   meals: [{
    alert: Boolean,
        _mealid: {
            type: mongoose.Schema.ObjectId,
            unique :true,
        } ,
        description: {
        de: String,
        en: String
    },
        name: {
        de: String,
        en: String
    },
       picture: String,
       specs: [{
        de: String,
        en: String,
        val: String,
    }],
   }],
   deviceid: String,
});



// createSchema.index({email:1})
var create = mongoose.model('alldevices', createSchema);
