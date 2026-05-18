import express from "express";
import { deleteUser, getUser, getUsers, updateUser, savePost, profilePosts } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
// router.get("/:id", verifyToken, getUser);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.get("/profilePosts", verifyToken, profilePosts);
userRouter.post("/save", verifyToken, savePost);
// router.get("/notification", verifyToken, getNotificationNumber);

export default userRouter;
