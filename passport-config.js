const passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  // FacebookStrategy = require("passport-facebook").Strategy,
  User = require("./models/user");

const sendMail = require("./emails");

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
        User.findOne({ email: email.emails[0].value }, (err, user) => {
          if (err) {
            // req.flash("error", "Something went wrong!!!");
            done(err, user);
          } else if (!user) {
            User.create(
              { email: email.emails[0].value, fullName: email.displayName, registeredUsing : "Google" },
              (err, user) => {
                // sendMail.registrationSuccessful(
                //   email.emails[0].value,
                //   email.displayName
                // );
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

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_KEY,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos"],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       return console.log(profile);
//       User.findOne({ provider_id: profile.id }, function (err, user) {
//         if (err) throw err;
//         if (!err && user != null) return done(null, user);

//         var user = new User({
//           provider_id: profile.id,
//           provider: profile.provider,
//           name: profile.displayName,
//           photo: profile.photos[0].value,
//         });
//         user.save(function (err) {
//           if (err) throw err;
//           done(null, user);
//         });
//       });
//     }
//   )
// );
