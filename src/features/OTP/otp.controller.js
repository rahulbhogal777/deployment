import redisClient from "../../config/redis.js";
import { passwordHash } from "../../hash/passHash.js";
import { createMail } from "../../middlewares/sendMail.js";
import crypto from "crypto";



export default class OtpController {
  async sendOtp(req, res, next) {
    try {
      const email = req.user.email;
      const name = req.user.name;
      const userId = req.user._id.toString();

      // Generate 6 digit otp
      let otp = "";
      for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
      }

      // Hash otp
      const hashOtp = crypto.createHash("sha256").update(otp).digest("hex");

      // Set redis with hashedOtp
      await redisClient.set(`otp: ${userId}`, hashOtp, { EX: 300, NX: true });

      // Send OTP to user
      await createMail(email, name, otp);
      res.status(200).json({ success: true, msg: "OTP send to user email. OTP valid only for 5 minutes." });
    } catch (err) {
      next(err);
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const userId = req.user._id.toString();
      const otp = req.body.otp;

      // Get stored hashOtp from redis
      const storedHash = await redisClient.get(`otp: ${userId}`);
      if (!storedHash) {
        return res.status(400).json({ success: false, msg: "OTP expired." });
      }

      // hash Otp using crytp0
      const hash = crypto.createHash("sha256").update(otp).digest("hex");

      // compared hashed otp
      if (hash !== storedHash) {
        return res.status(400).json({ success: false, msg: "OTP invalid." });
      }

      // Delete hashed otp from redis
      await redisClient.del(`otp: ${userId}`);
      res.status(200).json({ success: true, msg: "OTP is verified." });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { newPassword } = req.body;
      if (newPassword === null) {
        return res.status(400).json({ success: false, msg: "Password didn't matched." });
      }
      const hashPassword = await passwordHash(newPassword);
      req.user.password = hashPassword;
      await req.user.save();
      res.status(200).json({ success: true, msg: "Password changed successfully.", res: req.user });
    } catch (err) {
      next(err);
    }
  }

}
