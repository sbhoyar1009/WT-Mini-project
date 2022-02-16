const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  User = require("./models/user");

module.exports = function (passport) {
  // Serializa al usuario para almacenarlo en la sesión
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  // Deserializa el objeto usuario almacenado en la sesión para
  // poder utilizarlo
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:9000/auth/google/callback",
      },
      (accessToken, refreshToken, profile, email, done) => {
        console.log(profile);
        console.log(email);
        User.findOne({ username: email.emails[0].value }, (err, user) => {
          if (err) {
            // req.flash("error", "Something went wrong!!!");
            res.redirect("/");
          } else if (!user) {
            User.create(
              { username: email.emails[0].value, fullName: email.displayName },
              (err, user) => {
                return done(err, user);
              }
            );
          } else {
            console.log("User already exist: ", user);
            return done(err, user);
          }
        });
      }
    )
  );
};
