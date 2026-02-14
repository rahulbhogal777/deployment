import mongoose from "mongoose";

const url = process.env.DB_URL;
export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connection Established with mongoDB");
  } catch (err) {
    console.log(err);
  }
};
