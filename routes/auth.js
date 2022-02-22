const express = require("express"),
  router = express.Router({ mergeParams: true }),
  crypto = require("crypto"),
  //   nodeMailer = require("nodemailer"),
  dotenv = require("dotenv"),
  User = require("../models/user"),
  Admin = require("../models/admin"),
  passport = require("passport");

const sendMail = require("../emails");

dotenv.config();

router.post("/register", async (req, res) => {
  let userData = req.body.user;
  // console.log(req.body.user);

  let userExist = await User.findOne({ email: userData.email });
  if (userExist) {
    // req.flash("error", "User already exist");
    res.render("post-registration", {
      status: "success",
      alreadyRegistered: true,
    });
    // return done(null,userExist);
  } else {
    let newUser = new User({
      // username: userData.email,
      fullName: userData.name,
      email: userData.email,
      contactNumber: userData.phone,
      country: userData.country,
      city: userData.city,
    });
    User.create(newUser, function (err, user) {
      if (err) {
        // req.flash("error", err.message);

        console.log(err);
        res.redirect("back");
      } else {
        // req.flash("success", "Successfully Registered, Login with your Credentials!!!")
        // sendMail.registrationSuccessful(userData.email, userData.name);
        console.log("Successfully Registered, Login with your Credentials!!!");
        res.render("post-registration", { status: "success",alreadyRegistered:false });
        return done(null,user);
      }
    });
  }
});

// check is user already registered middleware 
// const isUserAlreadyRegistered = (req, res, next) => {
//   console.log(req)
// };





router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  // passport.authenticate("google", {
  //   successRedirect: "/registration/successful",
  //   failureRedirect: "/register",
  // }),
  // (req, res) => {
  //   console.log("req.user", req.user);
  // }
  (req,res)=>{
    res.render("post-registration",{status:"success",alreadyRegistered:false})
  }
);

// router.get(
//   "/auth/facebook",
//   passport.authenticate("facebook", { scope: "email" })
// );

// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

router.get("/speaker-details", async (req, res) => {
  res.render("speaker-detail");
});

router.post("/admin/login", async (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin",
  })(req, res);
});

router.get("/users", async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.send(users);
    }
  });
});

const createAdmin = () => {
  Admin.findOne({ username: "gauravvr77@gmail.com" }, (err, admin) => {
    if (err) {
      console.log(err);
    } else if (!admin || admin === null) {
      Admin.register(
        {
          username: "gauravvr77@gmail.com",
          fullName: "Gaurav Rasal",
        },
        "Admin@123",
        (err, admin) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Admin Created");
          }
        }
      );
    } else {
      console.log("Admin Already Exist");
    }
  });
};

// createAdmin();

module.exports = router;
