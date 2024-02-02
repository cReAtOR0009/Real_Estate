const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports.sendValidationEmail = async (req, token) => {
  const { email } = req.body;

  try {
    const CLIENT_URL = "http://" + req.headers.host;

    const output = `
      <h2>Please click the  link below to activate your account</h2>
      <p>${CLIENT_URL}/user/verify/${token}</p>
      <p><b>NOTE: </b> The above activation link expires in 1 hour.</p>
      `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nodejsa@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: token,
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: "CREATOZ", // sender address
      to: email, // list of receivers
      subject: "Account Verification: CREATOZ REAL ESTATE ✔", // Subject line
      generateTextFromHTML: true,
      html: output, // html body
    };

    let mail = await transporter.sendMail(mailOptions);

    if (!mail) {
      throw new Error("Error Sending Mail");
    }
    if (mail.accepted[0]) {
      // console.log(mail, "mail")
      return `Activation mail sent to ${mail.accepted[0]}`;
    }
  } catch (error) {
    console.log("something went wrong: Service: sendAdminActivationLink");
    throw new Error(error);
  }
};
