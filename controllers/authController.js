import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        userName: username,
        email,
        password: hashedPassword
      }
    });
    
    const responseUser = {
      id: newUser.id,
      userName: newUser.userName,
      username: newUser.userName,
      email: newUser.email,
      avatar: newUser.avatar ?? null,
    };

    res.json({
      success: true,
      message: "User registered successfully",
      user: responseUser
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        userName: username
      }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this username"
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign({
      id: user.id,
      username: user.userName,
      email: user.email,
      isAdmin: false,
    }, process.env.JWT_SECRET, { expiresIn: '7d' }); 
    
    const responseUser = {
      id: user.id,
      userName: user.userName,
      username: user.userName,
      email: user.email,
      avatar: user.avatar ?? null,
    };

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 
    }).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: responseUser
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error logging in user from server",
      error: error.message
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token').status(200).json({
      success: true,
      message: "User logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out user from server",
      error: error.message
    });
  }
};