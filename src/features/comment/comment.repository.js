import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { ObjectId } from "mongodb";
import { postModel } from "../posts/post.repository.js";

const commentModel = mongoose.model("Comment", commentSchema);

export const addComment = async (userId, postId, content) => {
  try {
    const newComment = new commentModel({
      user: new ObjectId(userId),
      post: new ObjectId(postId),
      content: content,
    });
    const comment = await newComment.save();
    const post = await postModel.findById(postId);
    post.commentable.push(new ObjectId(comment._id));
    await post.save();
    return {
      success: true,
      res: comment,
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

export const getComment = async (postId) => {
  try {
    const comments = await commentModel.find({ post: postId });
    if (comments.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: `${postId} yet not comment on any post.`,
        },
      };
    }
    return {
      success: true,
      res: comments,
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

export const updateComment = async (id, content) => {
  try {
    const comment = await commentModel.findById(id);
    if (comment === null) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Comment not found.",
        },
      };
    }
    comment.content = content || comment.content;
    const updatedComment = await comment.save();
    return {
      success: true,
      res: updatedComment,
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
export const deleteComment = async (id) => {
  try {
    const comment = await commentModel.findByIdAndDelete(id);
    if (comment === null) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Comment not found",
        },
      };
    }
    return {
      success: true,
      res: comment,
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
