import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,

  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});


//Compound unique index enforces uniqueness on a pair of fields together
friendSchema.index(
  {
    requester: 1,
    recipient: 1,
  },
  { unique: true },
);
