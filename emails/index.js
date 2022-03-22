const nodeMailer = require("nodemailer");

 const smtpTransport = nodeMailer.createTransport({
   host: "hjph3hive",
   port: 10025,
 });

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
//	attachments: attachments,
    subject: "KPIT Sparkle 2022 Grand Finale Registration Successful",
    Headers: {
      "Content-Type": "text/html",
    },
    html: ` 
    <div style="background: #212121;color: white !important; width: 600px; margin: 0 auto">
  <img src="cid:header" alt="Banner image" style="width: 100%; height: 200px; margin:0; @media screen and (max-width: 480px) {height: 100px}" />
  <div style="background: #212121; color: #f7f7f7 !important; padding: 2rem">
    <p>Hello ${name},</p>
    <p>
   <strong> CONGRATULATIONS! </strong>
      </p>
	<p>You've officially bagged an exclusive spot for the 4 days long virtual Grand Finale.
	We have planned some inspiring tech and knowledge talks and also exciting chats with the who's who of the industry, especially to motivate you.
	</p>
	<p> So keep an eye on your mailbox. The KPIT Sparkle Grand Finale is coming soon!! </p><br>
    <p>Regards,</p>
    <p>Team KPIT Sparkle</p>
  </div>
  <img src="cid:footer" alt="Footer image" style="width: 100%; height: 200px;  @media screen and (max-width: 480px) {height: 100px}" />
</div>
    `,

    attachments: [
      {
        filename: "header-mail.png",
        path: "https://sparklegrandfinale.kpit.com/img/email/header-mail.png",
        cid: "header",
      },
      {
        filename: "footer-mail.png",
        path: "https://sparklegrandfinale.kpit.com/img/email/footer-mail.png",
        cid: "footer",
      },
	  {
        filename: "Brochure.pdf",
        path: "https://sparklegrandfinale.kpit.com/img/email/Brochure.pdf",
        cid: "Brochure",
      }
    ],
  };

  // console.log(mailOptions);

   smtpTransport.sendMail(mailOptions, (error, response) => {
     if (error) {
       console.log(error);
     } else {
        console.log("Message sent: " + response);
     }
   });
};

// sendMail.registrationSuccessful("tejasborde99@gmail.com", "Tejas");

module.exports = send;
