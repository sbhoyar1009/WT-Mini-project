const express    = require("express"),
     dotenv     = require('dotenv'),
     bodyParser = require('body-parser'),
     router     = express.Router({mergeParams : true});

dotenv.config();


router.get("/",(req,res)=>{
    res.render("index")
})



module.exports = router;