import jwt from "jsonwebtoken";
import { ApplicationError } from "../../errorHanding/error.handing.js";
import {
  getalldetails,
  getuser,
  signin,
  singup,
  updateuser,
} from "./user.repository.js";

export default class UserController {
  async signUp(req, res, next) {
    try {
      const user = await singup(req.body);
      if (!user.success) {
        return next(
          new ApplicationError(user.error.msg, user.error.statusCode),
        );
      }
      res.status(201).json({
        success: user.success,
        msg: "User is registered successfully.",
        res: user.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const user = await signin(req.body);
      if (!user.success) {
        return next(
          new ApplicationError(user.error.msg, user.error.statusCode),
        );
      }
      const token = jwt.sign({ userId: user.res._id }, process.env.JWT_KEY, {
        expiresIn: "2d",
      });
      user.res.sessions.push({ token });
      await user.res.save();
      res.cookie("token", token, { maxAge: 2 * 24 * 60 * 60 * 1000 });
      res
        .status(200)
        .json({ success: user.success, msg: "User login successfully", token });
    } catch (err) {
      next(err);
    }
  }

  async logOut(req, res, next) {
    try {
      req.user.sessions = req.user.sessions.filter((tokens) => {
        return tokens.token !== req.token;
      });
      await req.user.save();
      res.clearCookie("token");
      res.status(200).json({
        success: true,
        msg: `${req.user.email} logout successully.`,
      });
    } catch (err) {
      next(err);
    }
  }

  async logOutAll(req, res, next) {
    try {
      req.user.sessions = [];
      await req.user.save();
      res.clearCookie("token");
      res.status(200).json({
        success: true,
        msg: "Logout from all-devices successfully.",
      });
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await getuser(id);
      if (!user.success) {
        return next(
          new ApplicationError(user.error.msg, user.error.statusCode),
        );
      }
      res.status(201).json({
        success: user.success,
        msg: `${id} user detail get successfully.`,
        res: user.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await getalldetails();
      if (!users.success) {
        return next(
          new ApplicationError(users.error.msg, users.error.statusCode),
        );
      }
      res.status(201).json({
        success: users.success,
        msg: "Get all users detail",
        res: users.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.userId;
      const user = await updateuser(id, req.body);
      if (!user.success) {
        return next(
          new ApplicationError(user.error.msg, user.error.statusCode),
        );
      }
      res.status(201).json({
        success: user.success,
        msg: "User detail is updated successfully.",
        res: user.res,
      });
    } catch (err) {
      next(err);
    }
  }
}
