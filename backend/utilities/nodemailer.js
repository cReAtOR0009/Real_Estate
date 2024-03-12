const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotEnv = require("dotenv");

dotEnv.config();

console.log("helloooo");

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    "974662439535-k58n1crprgu45ph3admtemicokau9ull.apps.googleusercontent.com",
    "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",
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//04-HJRll1AVyfCgYIARAAGAQSNwF-L9IrvCTUK_tG4jSiTnBLamn0QPSttg1qIK0ewz1eGtvNSZcoWRUjyRXInqBcs3ZcqbhCU0I",
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "epidnugoairdrop@gmail.com",
      clientId:
        "974662439535-k58n1crprgu45ph3admtemicokau9ull.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04-HJRll1AVyfCgYIARAAGAQSNwF-L9IrvCTUK_tG4jSiTnBLamn0QPSttg1qIK0ewz1eGtvNSZcoWRUjyRXInqBcs3ZcqbhCU0I",
      accessToken:
        "ya29.a0Ad52N39dx3jS8W07HHnLU2qgZeNFNrW13kazBPZDtbm_2GzcWCbC3bwHtxfWp5eV6XmTVCyQnlrKBQWrpFak08N2L4UPL3vsC14UXsO5DRzm2ki66dZ6zvR64dPZGlP2ttwLtu8gSLaTqOQjrmmdEwQcumMyOo9MPX_FaCgYKAd4SARMSFQHGX2Mi43uS9QXEjRCekd8viCLYEg0171", // No need to provide accessToken here
      tls: {
        rejectUnauthorized: false,
      },
    },
  });

  return transporter;
};

const sendEmail = async (emailTransporter, emailOptions) => {
  try {
    let mail = await emailTransporter.sendMail(emailOptions);
    return mail;
  } catch (error) {
    console.log("Error sending email:", error);
    throw error;
  }
};

module.exports.sendValidationEmail = async (req, token) => {
  const { email } = req.body;

  try {
    const CLIENT_URL = "http://" + req.headers.host;

    const output = `
      <h2>Please click the  link below to activate your account</h2>
      <p>${CLIENT_URL}/user/verify/${token}</p>
      <p><b>NOTE: </b> The above activation link expires in 1 hour.</p>
    `;

    const transporter = await createTransporter();

    const mailOptions = {
      from: "CREATOZ", // Sender address
      to: email, // Recipient address
      subject: "Account Verification: CREATOZ REAL ESTATE ✔", // Subject line
      generateTextFromHTML: true,
      html: output, // HTML body
    };

    let mail = await sendEmail(transporter, mailOptions);

    if (!mail || !mail.accepted[0]) {
      throw new Error("Error Sending Mail");
    }

    return `Activation mail sent to ${mail.accepted[0]}`;
  } catch (error) {
    console.log("Error in sendValidationEmail:", error);
    throw error;
  }
};

const req = {
  body: {
    email: "example@example.com", // Replace with the recipient's email
  },
  headers: {
    host: "localhost:3000", // Replace with the appropriate host
  },
};

const token = "sampleToken"; // Replace with the actual token

// Call the sendValidationEmail function with the sample data
// this.sendValidationEmail(req, token)
//   .then((result) => {
//     console.log(result); // Log the result
//   })
//   .catch((error) => {
//     console.error("Error:", error); // Log any errors 
//   });

//4/0AeaYSHCGDliW6RW1qPEnB9vqPHP4fR1kDiC-llPmMKkByOWdcCXSGguRYkeI6x2I7z-Zww
//access ya29.a0Ad52N39dx3jS8W07HHnLU2qgZeNFNrW13kazBPZDtbm_2GzcWCbC3bwHtxfWp5eV6XmTVCyQnlrKBQWrpFak08N2L4UPL3vsC14UXsO5DRzm2ki66dZ6zvR64dPZGlP2ttwLtu8gSLaTqOQjrmmdEwQcumMyOo9MPX_FaCgYKAd4SARMSFQHGX2Mi43uS9QXEjRCekd8viCLYEg0171
//refresh 1//04-HJRll1AVyfCgYIARAAGAQSNwF-L9IrvCTUK_tG4jSiTnBLamn0QPSttg1qIK0ewz1eGtvNSZcoWRUjyRXInqBcs3ZcqbhCU0I
