const nodeMailer = require("nodemailer");

// const smtpTransport = nodeMailer.createTransport({
//   host: "hjph3hive",
//   port: 10025,
// });

// smtpTransport.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

const send = {};

send.registrationSuccessful = (toMail, name) => {
  let mailOptions = {
    from: "kpitsparklegrandfinale2022@kpit.com",
    to: toMail,
    subject: "KPIT Sparkle 2022 Grand Finale Registration Successful",
    Headers: {
      "Content-Type": "text/html",
    },
    html: ` 
    <div style="background: #212121; width: 600px; margin: 0 auto">
  <img src="cid:header" alt="Banner image" style="width: 100%; height: 200px; margin:0; @media screen and (max-width: 480px) {height: 100px}" />
  <div style="background: #212121; color: #f7f7f7; padding: 2rem">
    <p>Hello ${name},</p>
    <p>
      Congratulations!, You have successfully registered for KPIT Sparkle 2022 Grand Finale.
      </p>
      <p>The event is scheduled from 24 March 2022 to 30 March 2022</p>
    <p>Regards,</p>
    <p>Team KPIT Sparkle</p>
  </div>
  <img src="cid:footer" alt="Footer image" style="width: 100%; height: 200px;  @media screen and (max-width: 480px) {height: 100px}" />
</div>
    `,

    attachments: [
      {
        filename: "header-mail.png",
        path: "./img/header-mail.png",
        cid: "header",
      },
      {
        filename: "footer-mail.png",
        path: "./img/footer-mail.png",
        cid: "footer",
      },
    ],
  };

  // console.log(mailOptions);

  // smtpTransport.sendMail(mailOptions, (error, response) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     // console.log("Message sent: " + response);
  //   }
  // });
};

// sendMail.registrationSuccessful("tejasborde99@gmail.com", "Tejas");

module.exports = send;
