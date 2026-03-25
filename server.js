const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./db");

const quizRoutes = require("./routes/quizRoutes");
const roomRoutes = require("./routes/roomRoutes");

const setupSocket = require("./socket");

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);
app.use("/api/room", roomRoutes);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

setupSocket(io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});