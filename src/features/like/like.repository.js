import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";

const likeModel = mongoose.model("Like", likeSchema);

export const toggleLike = async (userId, model, id) => {
  try {
    const deleteLike = await likeModel.findOneAndDelete({
      user: new ObjectId(userId),
      likable: new ObjectId(id),
      on_model: model,
    });
    if (deleteLike === null) {
      const newLike = await likeModel.create({
        user: new ObjectId(userId),
        likable: new ObjectId(id),
        on_model: model,
      });
      return {
        success: true,
        msg: "Like",
      };
    }
    return {
      success: true,
      msg: "Unlike",
    };
  } catch (err) {
    return {
      success: false,
      error: {
        statusCode: 404,
        msg: err,
      },
    };
  }
};

export const getLikes = async (id) => {
  try {
    const likes = await likeModel.find({ likable: new ObjectId(id) });
    if (likes.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Post or comment id not correct.",
        },
      };
    }
    return {
      success: true,
      res: likes,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        statusCode: 500,
        msg: err,
      },
    };
  }
};
