const express = require("express"),
  dotenv = require("dotenv"),
  bodyParser = require("body-parser"),
  router = express.Router({ mergeParams: true });

const User = require("../models/user");

dotenv.config();

const isAdmin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/admin");
  }
};

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.get("/registration/successful", function (req, res) {
  res.render("post-registration", { alreadyRegistered: false });
});
router.get("/already-registered", function (req, res) {
  res.render("post-registration", { alreadyRegistered: true });
});

router.get("/admin", async (req, res) => {
  res.render("secrete");
});

router.get("/admin/dashboard", isAdmin, async (req, res) => {
  User.find({}, async (err, users) => {
    res.render("dashboard", { users: users });
  });
});

module.exports = router;
