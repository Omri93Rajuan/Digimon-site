import express from "express";

import { Server } from "socket.io"; // Import socket.io Server
import http from "http"; // Import http server module
import { getRoomByName } from "./src/services/roomService";

import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./src/router/router";
import loadInitialData from "./src/initailData";
import chalk from "chalk";

const app = express();

const server = http.createServer(app); // Create HTTP server for socket.io

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Initialize data
loadInitialData().catch(console.error);

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log(chalk.cyanBright("Connected to MongoDB Atlas"));
  })
  .catch((error) => {
    console.error(chalk.red("Error connecting to MongoDB:", error));
  });
// ----------------------------------------------
// io.on("connection", (socket) => {
//   console.log(`A user connected ${socket.id} `);

//   socket.on("sendMessage", (message) => {
//     io.emit("receiveMessage", message);
//   });

//   socket.on("disconnect", () => {
//     console.log(`Usear disconnected ${socket.id}`);
//   });
// });
// ----------------------------------------------
// ----------------------------------------------
io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  socket.on("joinRoom", async (roomName) => {
    try {
      if (!roomName) {
        console.error("Invalid room name");
        return;
      }
      const room = await getRoomByName(roomName);
      console.log(room);

      socket.join(roomName);
    } catch (error) {
      console.log(error);
    }

    socket.on("sendMessageToRoom", (data) => {
      const { roomName, message, username } = data;

      io.to(roomName).emit("receiveMessage", {
        username,
        message,
        timestamp: new Date().toISOString(),
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});
// ----------------------------------------------

server.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk.blue(`Listening on: http://localhost:${process.env.PORT || 8000}`)
  );
});
