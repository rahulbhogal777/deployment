import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";
import { ObjectId } from "mongodb";

export const postModel = mongoose.model("Post", postSchema);

export const createPost = async (userId, caption, imageUrl) => {
  try {
    const newPost = new postModel({
      user: new ObjectId(userId),
      caption: caption,
      imageUrl: imageUrl,
    });
    const post = await newPost.save();
    return {
      success: true,
      res: post,
    };
  } catch (err) {
    return {
      success: false,
      error: { statusCode: 404, msg: err },
    };
  }
};

export const getPost = async (id) => {
  try {
    const post = await postModel.findById(id);
    if (post === null) {
      return {
        success: false,
        error: {
          statusCode: 401,
          msg: "Post not found",
        },
      };
    }
    return {
      success: true,
      res: post,
    };
  } catch (err) {
    return {
      success: false,
      error: { statusCode: 500, msg: err },
    };
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await postModel.find();
    if (posts.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Post not found",
        },
      };
    }
    return {
      success: true,
      res: posts,
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

export const updatePost = async (id, caption, imageUrl) => {
  try {
    const post = await postModel.findById(id);
    if (post === null) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Post not found.",
        },
      };
    }
    post.caption = caption || post.caption;
    post.imageUrl = imageUrl || post.imageUrl;
    const updatedPost = await post.save();
    return {
      success: true,
      res: updatedPost,
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

export const deletePostById = async (id) => {
  try {
    const post = await postModel.findByIdAndDelete(id);
    if (post === null) {
      return {
        success: false,
        error: {
          statusCode: 404,
          msg: "Post not found.",
        },
      };
    }
    return {
      success: true,
      res: post,
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

export const getUserPost = async (userId) => {
  try {
    const getPost = await postModel.find({ user: new ObjectId(userId) });
    if (getPost.length === 0) {
      return {
        success: false,
        error: {
          statusCode: 500,
          msg: "Post not found."
        }
      }
    }
    return {
      success: true,
      res: getPost
    }
  } catch (err) {
    return {
      success: false,
      msg: err,
    }
  }
}
