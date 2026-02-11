import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  sessions: [tokenSchema],
});
