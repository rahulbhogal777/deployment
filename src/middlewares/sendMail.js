import nodeMailer from "nodemailer";
import { ApplicationError } from "../errorHanding/error.handing.js";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const createMail = async (email, name, otp) => {
  try {
    const info = await transporter.sendMail({
      from: '"Postway Team"<rahulbhogal77@gmail.com>',
      to: email,
      subject: "Postaway verify OTP",
      html: `<b>Dear ${name},</b><br><br>
        <p>Your Postway password change OTP is: </p>
        <h2>${otp}</h2>
        <b>OTP is valid only for 5 Minutes.</b>
        <br><br>
        <p>Thank You</p>`,
    });
    console.log("OTP send: ", info.messageId);
  } catch (err) {
      console.log("Mail error: ",err.message)
    throw new ApplicationError("Failed to send OTP email", 500);
  }
};
