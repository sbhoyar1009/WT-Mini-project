const bodyParser = require("body-parser"),
  //   methodOveRide		    = require("method-override"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  express = require("express"),
  dotenv = require("dotenv"),
  Admin = require("./models/admin"),
  app = express();

const flash = require("connect-flash");

dotenv.config();
// require("./passport-config");

require("./passport-config")(passport);
const mainRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

passport.use(new localStrategy(Admin.authenticate()));

app.use(
  require("express-session")({
    secret: "This is the News App",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  next();
});

app.use(mainRoutes);
app.use(authRoutes);

app.get('*', function(req, res){
  res.render("notfound");
});
app.listen(process.env.PORT || 9000, function () {
  console.log("The Server is Listening!!!");
});
