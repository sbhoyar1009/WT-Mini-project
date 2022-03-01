const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

// mongoose.set('useFindAndModify', false);

var userSchema = new mongoose.Schema({
  username:{type: String },
  fullName: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  registeredOn: { type: Date, default: Date.now },
  userRegisteredOnEventWebsite: { type: Boolean, default: false },
  registeredUsing: { type: String, default: "Manual" },
  registerAttempts: { type: Number, default: 1 },
});

// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
