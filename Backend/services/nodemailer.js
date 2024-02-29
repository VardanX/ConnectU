const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

function get_html_message(name) {
  return `<h3>${name} , Your Password has been reset.</h3>`;
}

function mailSend(name, recipient) {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `Mini Facebook <${process.env.GMAIL_USER}>`,
    to: recipient,
    subject: "Password Reset",
    html: get_html_message(name),
  };

  transport.sendMail(mailOptions, function (error, result) {
    // error ? console.log("Error", error) : console.log("success", result);
    transport.close();
  });
}

module.exports = mailSend;
