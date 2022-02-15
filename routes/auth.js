const express = require("express"),
  router = express.Router({ mergeParams: true }),
  crypto = require("crypto"),
  //   nodeMailer = require("nodemailer"),
  dotenv = require("dotenv"),
  User = require("../models/user"),
  //   middleware = require("../middleware"),
  passport = require("passport");

dotenv.config();

router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", async (req, res) => {
  let userData = req.body.user;
  console.log(req.body.user);

  let userExist = await User.findOne({ email: userData.email });
  if (userExist) {
    // req.flash("error", "User already exist");
    console.log("Already Registered");
    res.redirect("back");
  } else {
    let newUser = new User({
      username: userData.email,
      password: userData.password,
      fullName: userData.name,
      email: userData.email,
      contactNumber: userData.phone,
      country: userData.country,
      city: userData.city,
    });
    User.register(newUser, userData.password, function (err, user) {
      if (err) {
        // req.flash("error", err.message);

        console.log(err);
        res.redirect("/");
      } else {
        // req.flash("success", "Successfully Registered, Login with your Credentials!!!")
        console.log("Successfully Registered, Login with your Credentials!!!");
        res.redirect("/");
      }
    });
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  (req, res) => {}
);

router.get("/speaker-details", async (req, res) => {
  res.render("speaker-detail");
});

router.get('/users', async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.send( users );
    }
  });
})

module.exports = router;
