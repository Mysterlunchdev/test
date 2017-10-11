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
    veggie: Boolean,
    vegan: Boolean,
    official: String,
    lastName: String,
    code: String,
        nl: String,
    url: String,
    deviceid: String,
    specs: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
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
        nl: String,
        en: String
    }
});



// createSchema.index({email:1})
var create = mongoose.model('ingredients', createSchema);


// var createSchema = mongoose.Schema({
    
// }, {strict: false});



// // createSchema.index({email:1})
// var create = mongoose.model('crowdflow', createSchema);
var createSchema = mongoose.Schema({
    Beacon_UUID: String,
    Beacon_Minor: String,
    Beacon_Major: String,
    Role_ID: String,
    Role_Description: String,
    CanteenID: String,
});



// createSchema.index({email:1})
var create = mongoose.model('beaconsuuid', createSchema);


var createSchema = mongoose.Schema({
    
}, {strict: false});



// createSchema.index({email:1})
var create = mongoose.model('crowdflow', createSchema);




var createSchema = mongoose.Schema({
    name: String,
    official: String,
}, {strict: false});



// createSchema.index({email:1})
var create = mongoose.model('canteens', createSchema);
var createSchema = mongoose.Schema({
    name: String,
    val: Number,
    official: String,
});



// createSchema.index({email:1})
var create = mongoose.model('count', createSchema);
var createSchema = mongoose.Schema({
    session_id: String, 
    uuid: String,
    major: Number,
    minor:Number, 
    datetime: {
        type:Date,
        default: Date.now
    }, 
    user_id: String,
    userid: mongoose.Schema.ObjectId,
});



// createSchema.index({email:1})
var create = mongoose.model('beacons', createSchema);




var createSchema = mongoose.Schema({
    title: String,
    picture: String,
    date: {
        type: Date,
        default: Date.now
    },
    text: String,
    official: String,
    picture: String,
    author: String,
});



// createSchema.index({email:1})
var create = mongoose.model('news', createSchema);


var createSchema = mongoose.Schema({
    official: String,
    name: {
        de: String,
        nl: String,
        en: String
    },
    ingredients: [{
        de: String,
        nl: String,
        en: String
    }],
    description: {
        de: String,
        nl: String,
        en: String
    },
    specs: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
    adds: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
    ampel: String,
    meats: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
    picture: String,
    price: [{
        de: {
            name: String,
            price: String,
        },
        nl: {
            name: String,
            price: String,
        },
        en: {
            name: String,
            price: String,
        }

    }],
   fav: Number,
    likes: {
        type:Number,
        default: 0},
        _canteenid: mongoose.Schema.ObjectId,
});



// createSchema.index({email:1})
var create = mongoose.model('meals', createSchema);


var createSchema = mongoose.Schema({
    day: Date,
    _mealid: mongoose.Schema.ObjectId,
    canteen: String,
     official: String,
   number: Number,
    name: {
        de: String,
        nl: String,
        en: String
    },
        adds: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
        meats: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],


    ingredients: [{
        de: String,
        nl: String,
        en: String
    }],
    description: {
        de: String,
        nl: String,
        en: String
    },
    specs: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
    ampel: String,
    picture: String,
    price: [{
        de: {
            name: String,
            price: String,
        },
        nl: {
            name: String,
            price: String,
        },
        en: {
            name: String,
            price: String,
        }
    }],
    _canteenid: mongoose.Schema.ObjectId,
    
});



// createSchema.index({email:1})
var create = mongoose.model('days', createSchema);
var createSchema = mongoose.Schema({
    likes: [{
        _mealid: mongoose.Schema.ObjectId,
    }],
    menuplan: [{
        day: String,
        _mealid: {
            type: mongoose.Schema.ObjectId,
        },
        ampel: String,
        description: {
            de: String,
        nl: String,
            en: String
        },
            name: {
            de: String,
        nl: String,
            en: String
        },
           picture: String,
           specs: [{
            de: String,
        nl: String,
            en: String,
            val: String,
        }],
            adds: [{
            de: String,
        nl: String,
            en: String,
            val: String,
        }],
            meats: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],

    }],
   meals: [{
    alert: Boolean,
        _mealid: {
            type: mongoose.Schema.ObjectId,
        } ,
        ampel: String,
        description: {
        de: String,
        nl: String,
        en: String
    },
        name: {
        de: String,
        nl: String,
        en: String
    },
       picture: String,
       specs: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
        adds: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],
        meats: [{
        de: String,
        nl: String,
        en: String,
        val: String,
    }],

   }],
     official: String,
  deviceid: String,
   userid: mongoose.Schema.ObjectId
});



// createSchema.index({email:1})
var create = mongoose.model('alldevices', createSchema);
