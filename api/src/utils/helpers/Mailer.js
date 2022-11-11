/**
 * Mailer helper
 */
import nodemailer from "nodemailer";

export default class Mailer {
  constructor() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: process.appConfig.mail.host,
        port: Number(process.appConfig.mail.port),
        // secure: false,
        // requireTLS: true,
        auth: {
          user: process.appConfig.mail.username,
          pass: process.appConfig.mail.password,
        },
      });
    }
  }

  sendMailToUser(mailOptions) {
    const email = mailOptions.to;
    this.transporter.sendMail(mailOptions, (error) => {
      console.log(mailOptions.html);
      if (error) {
        console.error(
          `Message not sent to ${email}, Subject: ${mailOptions.subject} , ${error}`
        );
      } else {
        console.info(
          `Message sent to ${email}, Subject: ${mailOptions.subject}`
        );
      }
    });
  }

  sendRegistrationMail(emailAddr, mailData) {
    const { uuid, activationLink } = mailData;
    const html = `<html><body>Welcome to our organization, Please click below link to activate your account. </br> <a href='${activationLink}'>${uuid}</a></body></html>`;

    const mailOptions = {
      from: process.appConfig.mail.name,
      to: emailAddr,
      subject: "Welcome",
      html,
      text: html,
    };

    this.sendMailToUser(mailOptions);
  }

  activationMail(emailAddr, mailData) {
    const { uuid, activationLink } = mailData;
    const html = `<html><body>Welcome to our organization, Please click below link to activate your account. </br> <a href='${activationLink}'>${uuid}</a></body></html>`;

    const mailOptions = {
      from: process.appConfig.mail.name,
      to: emailAddr,
      subject: "Welcome",
      html,
      text: html,
    };

    this.sendMailToUser(mailOptions);
  }

  forgotPasswordMail(emailAddr, mailData) {
    const { email, forgotPasswordLink } = mailData;
    const html = `<html><body>Welcome to our organization, Please click below link to reset your password. </br> <a href='${forgotPasswordLink}'>${email}</a></body></html>`;

    const mailOptions = {
      from: process.appConfig.mail.name,
      to: emailAddr,
      subject: "Welcome",
      html,
      text: html,
    };

    this.sendMailToUser(mailOptions);
  }
}
