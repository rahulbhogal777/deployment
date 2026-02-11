import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String,
        required: [true, "Caption is required."]
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"]
    },
    commentable:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})