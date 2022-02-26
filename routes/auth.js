const express = require("express"),
  router = express.Router({ mergeParams: true }),
  crypto = require("crypto"),
  dotenv = require("dotenv"),
  User = require("../models/user"),
  axios = require("axios"),
  Admin = require("../models/admin"),
  passport = require("passport");

const sendMail = require("../emails");

dotenv.config();

router.post("/register", async (req, res) => {
  let userData = req.body.user;
  // console.log(req.body.user);

  let userExist = await User.findOne({ email: userData.email.toLowerCase() });
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
      email: userData.email.toLowerCase(),
      contactNumber: userData.phone,
      country: userData.country,
      city: userData.city,
      state: userData.state,
    });
    User.create(newUser, function (err, user) {
      if (err) {
        // req.flash("error", err.message);

        console.log(err);
        res.redirect("back");
      } else {
        // req.flash("success", "Successfully Registered, Login with your Credentials!!!")
        // console.log(newUser);
        const parameters = new URLSearchParams({
          name: newUser.fullName,
          email: newUser.email.toLowerCase(),
          contactNumber: newUser.contactNumber ? newUser.contactNumber : "",
          city: newUser.city ? newUser.city : "",
          state: newUser.state ? newUser.state : "",
          country: newUser.country ? newUser.country : "",
        }).toString();
        // console.log(parameters);
        axios
          .get(process.env.EVENT_URL + "/add-user-manually?" + parameters)
          .then((r) => {
            console.log(r.data);
            if (
              r.data.message.length != 0 &&
              r.data.message[0] == "User added successfuly"
            ) {
              User.findOneAndUpdate(
                { email: newUser.email.toLowerCase() },
                { userRegisteredOnEventWebsite: true },
                (err, u) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("User Added to event website successfully");
                    //sendMail.registrationSuccessful(u.email.toLowerCase(), u.fullName);
                    // console.log(
                    //   "Successfully Registered, Login with your Credentials!!!"
                    // );
                    return res.render("post-registration", {
                      status: "success",
                      alreadyRegistered: false,
                    });
                  }
                }
              );
            } else {
              res.redirect("/register");
            }
          })
          .catch((err) => {
            console.error(err);
            return res.redirect("/register");
          });
      }
    });
  }
});

router.get("/add-user-manually", (req, res) => {
  console.log(req.query);
  User.findOne({ email: req.query.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      res.send({ message: ["User added successfuly"] });
    } else {
      res.send({ message: ["mail already exist"] });
    }
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/registration/successful",
    failureRedirect: "/register",
  }),
  (req, res) => {
    console.log("req.user", req.user);
  }
  // (req,res)=>{
  //   res.render("post-registration",{status:"success",alreadyRegistered:false})
  // }
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
