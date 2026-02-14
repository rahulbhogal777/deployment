import cookieParser from "cookie-parser";
import express from "express";
import "./env.js";
import { ApplicationError, errorHandler } from "./src/errorHanding/error.handing.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import friendRouter from "./src/features/friends/friend.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import postRoputer from "./src/features/posts/post.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtMiddleware from "./src/middlewares/jwtAuth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("uploads"));

app.use("/api/users", userRouter);
app.use("/api/posts", jwtMiddleware, postRoputer);
app.use("/api/likes", jwtMiddleware, likeRouter);
app.use("/api/comments", jwtMiddleware, commentRouter);
app.use("/api/friends", jwtMiddleware, friendRouter);

app.use((req, res, next) => {
  next(new ApplicationError("Route is not found", 404));
});

app.use(errorHandler);

export default app;
