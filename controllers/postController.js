import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json({
        posts
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed to get posts' });
      
    }
}

export const getPost = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {id},
        include: {
          postDetail: true,
          user: {
            select : {
              userName: true,
              avatar: true
            }
          }
        }
      });
      res.status(200).json({
        post
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed to get post' });
      
    }
}

export const addPost = async (req, res) => {
  const body = req.body
  const tokenUserId = req.userId  
    try {
      const newPost = await prisma.post.create({
        data: {
          ...body.postData,
          userId: tokenUserId,
          postDetail: {
            create: body.postDetail
          }
        }
      });
      res.status(200).json({
        newPost
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed to create posts' });
      
    }
}


export const updatePost = async (req, res) => {
    try {
      res.status(200).json({

      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed to update posts' });
      
    }
}


export const deletePosts = async (req, res) => {
  const {id} = req.params
  const tokenUserId = req.userId
    try {
      const post = await prisma.post.findUnique({
        where: {
          id
        }      });
      if(post.userId !== tokenUserId) {
        return res.status(403).json({ message: 'you are not authorized to delete this post' });
      }
      await prisma.post.delete({
        where: {
          id
        }
      });
      res.status(200).json({
        message: 'post deleted successfully'
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed to delete posts' });
      
    }
}