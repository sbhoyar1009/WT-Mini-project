const nodeMailer = require("nodemailer");

const smtpTransport = nodeMailer.createTransport({
  host: "hjp3hive",
  port: 443,
});

const sendMail = {};

sendMail.registrationSuccessful = (toMail, name) => {
  let mailOptions = {
    from: "KPIT Sparkle 2022",
    to: toMail,
    subject: "Registration Successful",
    text: `Hi ${name},\n\nYou have successfully registered for KPIT Sparkle 2022.\n\nRegards,\nKPIT Sparkle 2022 Team`,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }
  });
};

module.exports = sendMail;
