const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var adminSchema = new mongoose.Schema({
  username: { type: String },
    password: { type: String },
  fullName: { type: String, default: "SPARKLE Admin" },
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", adminSchema);
