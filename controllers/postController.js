import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;
    try {
      const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
      res.status(200).json(posts)
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
      res.status(200).json(post)
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'failed to get post' });
      
    }
}

// server/controllers/postController.js

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  
  if (!tokenUserId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    // ✅ Explicitly handle all fields
    const newPost = await prisma.post.create({
      data: {
        title: body.postData.title,
        price: parseInt(body.postData.price),
        images: body.postData.images || [],
        address: body.postData.address,
        city: body.postData.city,
        bedroom: parseInt(body.postData.bedroom),
        bathroom: parseInt(body.postData.bathroom),
        latitude: body.postData.latitude ? parseFloat(body.postData.latitude) : null,
        longitude: body.postData.longitude ? parseFloat(body.postData.longitude) : null,
        type: body.postData.type,
        property: body.postData.property,
        userId: tokenUserId,
        postDetail: {
          create: {
            desc: body.postDetail.desc,
            utilities: body.postDetail.utilities,
            pet: body.postDetail.pet,
            income: body.postDetail.income,
            size: body.postDetail.size ? parseInt(body.postDetail.size) : null,
            school: body.postDetail.school ? parseInt(body.postDetail.school) : null,
            bus: body.postDetail.bus ? parseInt(body.postDetail.bus) : null,
            restaurant: body.postDetail.restaurant ? parseInt(body.postDetail.restaurant) : null
          }
        }
      }
    });
    
    console.log("Post created with coordinates:", {
      id: newPost.id,
      latitude: newPost.latitude,
      longitude: newPost.longitude
    });
    
    res.status(201).json(newPost);
    
  } catch (error) {
    console.log("Error creating post:", error);
    res.status(500).json({ message: 'failed to create post' });
  }
};


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