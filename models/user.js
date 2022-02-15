const mongoose = require("mongoose"),
  dotenv = require("dotenv"),
  passportLocalMongoose = require("passport-local-mongoose");

// mongoose.set('useFindAndModify', false);

var userSchema = new mongoose.Schema({
  fullName: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  contactNumber: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
