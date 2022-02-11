const passport       = require('passport'),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
	    User           = require("./models/user");


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

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:9000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, email, done) => {
    User.findOne({username : email.emails[0].value}, (err, user) => {
      if(err){
        // req.flash("error", "Something went wrong!!!");
        res.redirect('/');
      } else if (!user) {
        User.create({ username: email.emails[0].value }, (err, user) => {
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    })
    
  }
));
};