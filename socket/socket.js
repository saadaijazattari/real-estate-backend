
import { Server } from "socket.io";

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id, " socket connected");

    socket.on("newUser", (userId) => {
      addUser(userId, socket.id);
      console.log(`User ${userId} connected`);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
      console.log(data, "===> socket send message data");
      const receiver = getUser(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("getMessage", data);
      }
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(`Socket ${socket.id} disconnected`);
    });
  });

  return io;
};