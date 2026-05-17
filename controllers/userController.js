import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    // Normalize each user to include `username` alias and consistent fields
    const normalized = users.map(u => ({
      id: u.id,
      userName: u.userName,
      username: u.userName,
      email: u.email,
      avatar: u.avatar ?? null,
    }));

    res.status(200).json(normalized);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    const normalized = {
      id: user.id,
      userName: user.userName,
      username: user.userName,
      email: user.email,
      avatar: user.avatar ?? null,
    };

    res.status(200).json({
      message: "User fetched successfully",
      user: normalized,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar,username, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        userName: username,
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;
    const normalized = {
      id: rest.id,
      userName: rest.userName,
      username: rest.userName,
      email: rest.email,
      avatar: rest.avatar ?? null,
      ...rest,
    };

    res.status(200).json({
      message: "User updated successfully",
      user: normalized,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update users!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};





