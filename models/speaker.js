const mongoose = require("mongoose");

 var speakerSchema = new mongoose.Schema({
  name: { type: String },
  designation: { type: String },
  description: { type: String },
  facebookID: { type: String },
  twitterID: { type: String },
  personalWebsite: { type: String },
  });



module.exports = mongoose.model("Speaker", speakerSchema);
