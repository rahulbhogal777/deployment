import bcrypt from "bcrypt";
import { ApplicationError} from "../errorHanding/error.handing.js";

export const passwordHash = async (password) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err)
    throw new ApplicationError("Sorry! Error at the time of password hashing!!!", 400);
  }
};

export const compareHashPassword = async (password, hashPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (err) {
    throw new ApplicationError("Sorry! Error at the time passwod comparision!!!", 400)
  }
};
