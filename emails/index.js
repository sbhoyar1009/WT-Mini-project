const nodeMailer = require("nodemailer");

const smtpTransport = nodeMailer.createTransport({
  host: "hjph3hive",
  port: 10025,
});

smtpTransport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const send = {};

send.registrationSuccessful = (toMail, name) => {
  let mailOptions = {
    from: "kpitsparklegrandfinale2022@kpit.com",
    to: toMail,
    subject: "KPIT Sparkle 2022 Grand Finale Registration Successful",
    text: `Hi ${name},\n\nYou have successfully registered for KPIT Sparkle 2022.\n\nRegards,\nKPIT Sparkle 2022 Team`,
  };

  // console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      // console.log("Message sent: " + response);
    }
  });
};

// sendMail.registrationSuccessful("tejasborde99@gmail.com", "Tejas");

module.exports = send;
