const express = require("express"),
  dotenv = require("dotenv"),
  bodyParser = require("body-parser"),
  router = express.Router({ mergeParams: true });

const Admin = require("../models/admin");
const User = require("../models/user");

dotenv.config();

const isAdmin = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    Admin.findOne({ username: req.user.username }, (err, user) => {
      if (err || !user || user == null) {
        return res.redirect("back");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/admin");
  }
};

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

//middleware to check req.user
const checkUser = async (req, res, next) => {
  // console.log("User : ", req.user);
  if (req.user) {
    const user = await User.findOne({ email: req.user.email.toLowerCase() });
    if (user.registerAttempts !== 1) {
      res.render("post-registration", {
        status: "success",
        alreadyRegistered: true,
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

router.get("/registration/successful", checkUser, (req, res) => {
  res.render("post-registration", {
    status: "success",
    alreadyRegistered: false,
  });
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
