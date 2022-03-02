const mongoose = require("mongoose");

var speakerSchema = new mongoose.Schema({
  speakerName: { type: String },
  companyName: { type: String },
  emailID: { type: String },
  designation: { type: String },
  Date: { type: String },
  modeOfRecording: { type: String },
  link: { type: String },
  topicName: { type: String },
  status: { type: Boolean, default: true },
  twitter: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Speaker", speakerSchema);
