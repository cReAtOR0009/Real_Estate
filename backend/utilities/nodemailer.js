const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID_MINE,
    process.env.CLIENT_SECRET_MINE,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN_MINE,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({ 
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID_MINE,
      clientSecret: process.env.CLIENT_SECRET_MINE,
      refreshToken: process.env.REFRESH_TOKEN_MINE,
      tls: {
        rejectUnauthorized: false
      } 
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  try {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  } catch (error) {
    console.log("error:", error?.message);
  }
};

const sendmail = sendEmail({
  subject: "Test",
  text: "I am sending an email from nodemailer!",
  to: "epidnugotaiwo02@gmail.com",
  from: process.env.EMAIL,
});

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
        user: "epidnugoairdrop@gmail.com",
        clientId: process.env.CLIENT_ID_MINE,
        clientSecret: process.env.CLIENT_SECRET_MINE,
        refreshToken: process.env.REFRESH_TOKEN_MINE,
        accessToken: token,
        tls: {
            rejectUnauthorized: false
          }
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
    console.log(error);
    throw new Error(error);
  }
};
