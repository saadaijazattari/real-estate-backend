import express from 'express';
import { addPost, deletePosts, getPost, getPosts, updatePost } from '../controllers/postController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const postRouter = express.Router();

postRouter.get("/", getPosts)
postRouter.get("/:id", getPost)
postRouter.post("/",verifyToken, addPost )
postRouter.delete("/:id",verifyToken, deletePosts)
postRouter.put("/:id",verifyToken, updatePost)

export default postRouter;