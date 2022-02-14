const mongoose = require('mongoose'),
      dotenv   = require('dotenv'),
      passportLocalMongoose = require("passport-local-mongoose");




// mongoose.set('useFindAndModify', false);


var userSchema = new mongoose.Schema({
	username:{type : String, unique : true, required : true},
	fullName : {type : String, required : true},
	password : {type : String, required : true},
	email : {type : String, unique : true, required : true},
	contactNumber : {type : String, required : true},
	country:{type:String, required:true},
	state:{type:String},
	city:{type:String, required:true}
	
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);