const nodeMailer = require("nodemailer");

const smtpTransport = nodeMailer.createTransport({
  host: "hjph3hive",
  port: 10025,
});

const sendMail = {};

sendMail.registrationSuccessful = (toMail, name) => {
  let mailOptions = {
    from: "KPIT Sparkle 2022",
    to: toMail,
    subject: "Registration Successful",
    text: `Hi ${name},\n\nYou have successfully registered for KPIT Sparkle 2022.\n\nRegards,\nKPIT Sparkle 2022 Team`,
  };

  console.log(mailOptions);

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response);
    }
  });
};

sendMail.registrationSuccessful("tejasborde99@gmail.com", "Tejas");

module.exports = sendMail;
