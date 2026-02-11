import express from "express";
import UserController from "./user.controllers.js";
import jwtMiddleware from "../../middlewares/jwtAuth.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.post("/logout", jwtMiddleware, userController.logOut);
userRouter.post("/logout-all-devices", jwtMiddleware, userController.logOutAll);
userRouter.get("/get-details/:id", userController.getUser);
userRouter.get("/get-all-details", userController.getAllUsers);
userRouter.put("/update-details/:userId", userController.updateUser);

export default userRouter;
