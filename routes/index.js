const express    = require("express"),
     dotenv     = require('dotenv'),
     bodyParser = require('body-parser'),
     router     = express.Router({mergeParams : true});

dotenv.config();


router.get("/", (req,res)=>{
    res.render("index");
})

router.get("/register", function (req, res) {
    res.render("register");
  });
  

router.get("/post-registration", (req, res) => {

    res.render("post-registration");
  });


module.exports = router;