const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const cors = require("cors");
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use(express.json()); // To accept the JSON object

app.use("/api/user", cors(), userRoutes);
app.use("/api/chat", cors(), chatRoutes);
app.use("/api/message", cors(), messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Backend Running PORT 5000`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:5173" },
});

const AddUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(`A user Connected ${userId} ${socketId}`);
};

const RemoveUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(`A User Disconnected ${socketId}`);
};

const users = [];

io.on("connection", (socket) => {
  console.log("connection to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
    // AddUser(userData._id, socket.id);
    // io.emit("getUsers", users);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user Join Room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.user not Defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISSCONNCETED");
    socket.leave(userData._id);
    // RemoveUser(socket.id);
    // io.emit("getUsers", users);
  });
});
