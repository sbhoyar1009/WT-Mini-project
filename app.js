const bodyParser = require("body-parser"),
  //   methodOveRide		    = require("method-override"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  express = require("express"),
  dotenv = require("dotenv"),
  User = require("./models/user"),
  app = express();

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

passport.use(new localStrategy(User.authenticate()));

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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(mainRoutes);
app.use(authRoutes);

// app.get("/",(req,res)=>{
//     res.render("index")
// })

app.listen(process.env.PORT || 9000, function () {
  console.log("The Server is Listening!!!");
});
