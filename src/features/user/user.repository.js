import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { compareHashPassword, passwordHash } from "../../hash/passHash.js";

export const userModel = mongoose.model("User", userSchema);

export const singup = async (data) => {
  try {
    const { name, email, password, gender } = data;
    const hashPassword = await passwordHash(password);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      gender: gender,
    });
    const user = await newUser.save();
    return {
      success: true,
      res: user,
    };
  } catch (err) {
    return {
      success: false,
      error: { statusCode: 400, msg: err },
    };
  }
};

export const signin = async (data) => {
  try {
    const { email, password } = data;
    const user = await userModel.findOne({ email: email }).select("+password");

    if (user === null) {
      return {
        success: false,
        error: { statusCode: 401, msg: "Invalid email or password." },
      };
    }

    const isPasswordMatch = await compareHashPassword(password, user.password);

    if (!isPasswordMatch) {
      return {
        success: false,
        error: { statusCode: 401, msg: "Invalid email or password." },
      };
    }
    return {
      success: true,
      res: user,
    };
  } catch (err) {
    return {
      success: false,
      error: { statusCode: 500, msg: err },
    };
  }
};

export const getuser = async (id) => {
  try {
    const user = await userModel.findById(id);
    if (user === null) {
      return {
        success: false,
        error: { statusCode: 400, msg: "User not found" },
      };
    }
    return {
      success: true,
      res: user,
    };
  } catch (err) {
    return {
      success: false,
      error: { statusCode: 500, msg: err },
    };
  }
};

export const getalldetails = async () => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Users are not registered yet.",
        },
      };
    }
    return {
      success: true,
      res: users,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        statusCode: 400,
        msg: err,
      },
    };
  }
};

export const updateuser = async (id, data) => {
  try {
    const user = await userModel.findById(id);
    if (user === null) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "User id invalid.",
        },
      };
    }
    const { name, email, gender } = data;
    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    const updatedUser = await user.save();
    return {
      success: true,
      res: updatedUser,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        statusCode: 400,
        msg: err,
      },
    };
  }
};
