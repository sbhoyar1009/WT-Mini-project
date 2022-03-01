const express = require("express"),
  dotenv = require("dotenv"),
  bodyParser = require("body-parser"),
  router = express.Router({ mergeParams: true });

const Admin = require("../models/admin");
const User = require("../models/user");
const Speaker = require("../models/speaker");

dotenv.config();

const isAdmin = (req, res, next) => {
  if (req.user) {
    //console.log(req.user);
    Admin.findOne({ username: req.user.username }, (err, user) => {
      if (err || !user || user == null) {
        return res.redirect("back");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/admin");
  }
};

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

//middleware to check req.user
const checkUser = async (req, res, next) => {
  // console.log("User : ", req.user);
  if (req.user) {
    const user = await User.findOne({ email: req.user.email.toLowerCase() });
    if (user.registerAttempts !== 1) {
      res.render("post-registration", {
        status: "success",
        alreadyRegistered: true,
        email: req.user.email.toLowerCase(),
      });
    } else {
      next();
    }
  } else {
    res.redirect("register");
  }
};

router.get("/registration/successful", checkUser, (req, res) => {
  res.render("post-registration", {
    status: "success",
    alreadyRegistered: false,
    email: req.user.email.toLowerCase(),
  });
});

router.get("/admin", async (req, res) => {
  res.render("secrete");
});

router.get("/admin/dashboard", isAdmin, async (req, res) => {
  User.find({}, async (err, users) => {
    res.render("dashboard", { users: users });
  });
});

router.post("/createspeaker", async (req, res) => {
  // return console.log("hiii", req.body);
  let speakers = [
    {
      speakerName: "Lalit Arora",
      companyName: "Tata Communications",
      emailID: "Lalit.Arora1@tatacommunications.com",
      designation:
        "India Head – Client Relationships, Connected Automotive Solutions\nTata Communications ",
      topicName:
        "Data, Platforms and Connectivity - Aligning Mobility with the needs of Connected Vehcile Programs\n",
      Date: "14th FEB -  2 PM",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/98919984119?pwd=QUJ1QnkxQ0dTYW5BWkpuYldGU3YzZz09",
      status: true,
    },
    {
      speakerName: "Pradeep Chandrashekaran",
      companyName: "Ola Electric",
      emailID: "pradeep.c1@olaelectric.com",
      designation:
        "Associate Director - Vehicle Engineering , OLA Electric Technologies Pvt Ltd.",
      topicName: "Fuel Cell Solutions for Transportation - Future Mobility\n",
      Date: "20th Feb:\n12PM",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/9684334266?pwd=bnJQY0ZEQmdBNmJNV08wZk5jZUVUQT09",
      status: true,
    },
    {
      speakerName: "AbhilashS K & Santhana Raj",
      companyName: "Pathpartner",
      emailID:
        "abhilash.sk@pathpartnertech.com, santhana.raj@pathpartnertech.com",
      designation:
        "Abhilash - Technical Lead\nPathPartner Technology, Santhana Raj - Technical Architect\nPathPartner Technology",
      topicName:
        "Abhilash - AI based Pedestrian Analytics for Autonomous Vehicles, Santhana Raj - Automotive Radar Technology assisting in next level of Autonomous Driving\n\n",
      Date: "Thursday, 24th FEB from 2PM - 4 PM",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/94594921175?pwd=a1JIdGVxU2hrSEl2b2xvQmZha3ZPQT09",
      status: true,
    },
    {
      speakerName: "Nakul H. Navarange",
      companyName: "Qualcomm Technologies, Inc.",
      emailID: "nakuln@qti.qualcomm.com",
      designation:
        "Staff Systems Engineer, 5G Networks, Qualcomm Technologies, Inc",
      topicName: "First Look at 5G (To be confirmed soon)",
      Date: "28th FEB - SELF",
      modeOfRecording: "",
      link: "",
      status: false,
    },
    {
      speakerName: "Shobhit Shrotriya",
      companyName: "Accenture",
      emailID: "shobhit.shrotriya@accenture.com",
      designation:
        "Managing Director – Global Life Sciences R&D Operations, Accenture Life Sciences R&D Operations",
      topicName: "The Journey to Intelligent Innovation\n",
      Date: "28th FEB 4 PM",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/98636716412?pwd=em1HL05JOVF1Z2xzOVdtRTQxaDRtdz09",
      status: false,
    },
    {
      speakerName: "Rakesh Mehta",
      companyName: "",
      emailID: "rakesh.mehta57@gmail.com",
      designation:
        "Serial Entrepreneur, Indian Defence & Space Design Expert, Ex Founder Director, Bit Mapper Technologies",
      topicName: "Semiconductor Design Opportunities in India\n",
      Date: "16th FEB - 3.30 PM",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/98709701662?pwd=RHRUdElpWElERkhDeG9qN3FpRnF6dz09",
      status: true,
    },
    {
      speakerName: "Raghu Muttige",
      companyName: "Dana",
      emailID: "Raghu.Muttige@dana.com",
      designation: "Managing Director - Dana India Technical Center (DITC)",
      topicName: "Clock Speed in Mobility Industry",
      Date: "Tuesday, 22nd February 2022 \nTime: 11 AM IST\n",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/95346740413?pwd=VnhFR20yd3dUcXR0cmRRNkpGZGtsQT09",
      status: true,
    },
    {
      speakerName: "Omkar Panse",
      companyName: "KPIT Technologies",
      emailID: "dirced@annauniv.edu | omkar.panse@kpit.com",
      designation: "",
      topicName: "",
      Date: "5th March, Saturday 11:30 am",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/92192459936?pwd=a0J2TWRwU3duaG5GaGZLbWNUdFVqQT09",
      status: false,
    },
    {
      speakerName: "TBD",
      companyName: "Thermax",
      emailID: "",
      designation: "",
      topicName: "Carbon Footprint",
      Date: "",
      modeOfRecording: "",
      link: "",
      status: false,
    },
    {
      speakerName: "Dr. R. Saravanan",
      companyName: "Anna University",
      emailID: "dirced@annauniv.edu",
      designation: "",
      topicName: "Solar cooling technology",
      Date: "2nd March - 11 AM",
      modeOfRecording: "",
      link: "https://ov-live-in.zoom.us/j/93539935936?pwd=RzZ1cktzOTdFakkwN3RVU0h1eVZhQT09",
      status: false,
    },
    {
      speakerName: "Mr. S. Venkatramani",
      companyName: "Ex Siemens GM",
      emailID: "s.venkatramani47@gmail.com",
      designation: "",
      topicName: "Evolutions of Solid State devices from vaccum tunes to IGBT",
      Date: "27th March 12 PM",
      modeOfRecording: "",
      link: "https://ov-live-in.zoom.us/j/96173539731?pwd=YnBORll1RVppSE5YR0p4emRNUndVQT09",
      status: true,
    },
    {
      speakerName: "Himanshu Jain",
      companyName: "Salient Process",
      emailID: "himanshu12221@gmail.com",
      designation: "",
      topicName: "Quantum computing",
      Date: "",
      modeOfRecording: "",
      link: "",
      status: false,
    },
    {
      speakerName: "Nikhil Devshatwar",
      companyName: "Texas Instruments",
      emailID: "nikhildevshatwar@gmail.com",
      designation: "",
      topicName: "Open Source Development",
      Date: "2nd March 22 Wed  2PM ",
      modeOfRecording: "",
      link: "https://ov-live-in.zoom.us/j/93674370041?pwd=bXptb0MyUG9YSHM3dlNYeXBUMjNPdz09",
      status: false,
    },
    {
      speakerName: "Dr Victor Fey",
      companyName: "Triz Master",
      emailID: "",
      designation: "",
      topicName: "TRIZ at Samsung",
      Date: "",
      modeOfRecording: "",
      link: "",
      status: true,
    },
    {
      speakerName: "Dr Rama Kumar",
      companyName: "Indian Oil",
      emailID: "",
      designation: "",
      topicName: "",
      Date: "",
      modeOfRecording: "",
      link: "",
      status: false,
    },
    {
      speakerName: "Dr Shaver",
      companyName: "",
      emailID: "",
      designation: "",
      topicName: "",
      Date: "",
      modeOfRecording: "",
      link: "",
      status: false,
    },
    {
      speakerName: "Dr Anita Gupta",
      companyName: "DST",
      emailID: "",
      designation: "",
      topicName: "",
      Date: "3rd March 4 PM",
      modeOfRecording: "Zoom",
      link: "https://ov-live-in.zoom.us/j/93658180878?pwd=RC8yK0N4cUtQdURzZmVmS3A4WlVCdz09",
      status: false,
    },
    {
      speakerName: "Dr Ravindrasingh Pardeshi",
      companyName: "Fergusson College",
      emailID: "",
      designation: "",
      topicName: "",
      Date: "",
      modeOfRecording: "",
      link: "",
      status: false,
    },
    {
      speakerName: "Dr Abhay Jere",
      companyName: "",
      emailID: "",
      designation: "",
      topicName: "",
      Date: "",
      modeOfRecording: "",
      link: "",
      status: false,
    },
  ];
  speakers.forEach(async (speaker) => {
    // console.log("Speaker : ", speaker);
    let dbSpeaker = new Speaker(speaker);
    await dbSpeaker.save();
  });

  res.send("Speakers added successfully");
});

router.post("/temp-post", (req, res) => {
  try {
    req.body = JSON.parse(Object.keys(req.body)[0]);
    console.log("req.body : ", req.body);
  } catch (err) {
    req.body = req.body;
    console.log("req.body : ", req.body);
  }
  res.send("success");
});

router.get("*", function (req, res) {
  res.render("notfound");
});

module.exports = router;
