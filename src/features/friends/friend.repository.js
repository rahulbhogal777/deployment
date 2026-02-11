import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { friendSchema } from "./friend.schema.js";

const friendModel = mongoose.model("Friendship", friendSchema);

export const toggleFriend = async (userId, friendId) => {
  try {
    const existing = await friendModel.findOne({
      $or: [
        { requester: new ObjectId(userId), recipient: new ObjectId(friendId) },
        { requester: new ObjectId(friendId), recipient: new ObjectId(userId) },
      ],
    });

    if (existing === null) {
      const newfriend = await friendModel.create({
        requester: new ObjectId(userId),
        recipient: new ObjectId(friendId),
        status: "Pending",
      });
      return {
        success: true,
        msg: "Friend",
      };
    }

    if (existing.status === "Accepted") {
      await existing.deleteOne();
      return {
        success: true,
        msg: "Unfriend",
      };
    }

    await existing.deleteOne();
    return {
      success: true,
      msg: "Request cancelled",
    };
  } catch (err) {
    return {
      success: false,
      msg: err,
    };
  }
};

export const getFriends = async (userId) => {
  try {
    const friends = await friendModel
      .find({
        status: "Accepted",
        $or: [
          { requester: new ObjectId(userId) },
          { recipient: new ObjectId(userId) },
        ],
      })
      .populate("requester")
      .populate("recipient");
    if (!friends.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: "Friend is not found."
        }
      }
    }
    return {
      success: true,
      res: friends,
    };
  } catch (err) {
    return {
      success: false,
      msg: err,
    };
  }
};

export const getPending = async (userId) => {
  try {
    const pendingFriend = await friendModel
      .find({
        recipient: new ObjectId(userId),
        status: "Pending",
      })
      .populate("requester");
    if (pendingFriend.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: "Friend request not found."
        }
      }
    }
    return {
      success: true,
      res: pendingFriend,
    };
  } catch (err) {
    return {
      success: false,
      msg: err,
    };
  }
};

export const responseToRequest = async (userId, friendId, action) => {
  try {
    const request = await friendModel.findOne({
      requester: new ObjectId(friendId),
      recipient: new ObjectId(userId),
      status: "Pending",
    });

    if (request === null) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Friend request not found",
        },
      };
    }

    if (action === "Accept") {
      request.status = "Accepted";
      await request.save();
      return {
        success: true,
        msg: "Friend request accepted",
      };
    }

    if (action === "Reject") {
      await request.deleteOne();
      return {
        success: true,
        msg: "Friend request rejected",
      };
    }
  } catch (err) {
    return {
      success: false,
      msg: err,
    };
  }
};
