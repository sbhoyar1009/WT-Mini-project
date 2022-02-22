const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

// mongoose.set('useFindAndModify', false);

var userSchema = new mongoose.Schema({
  fullName: { type: String },
  // password: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  registeredOn: { type: Date, default: Date.now },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
