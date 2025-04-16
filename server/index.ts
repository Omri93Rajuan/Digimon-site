import express from "express";
import { Server } from "socket.io"; // Import socket.io Server
import http from "http"; // Import http server module
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./src/router/router";
import loadInitialData from "./src/seed/initailData";
import chalk from "chalk";
import connectToDb from "./src/db/dbService";

import mainSocket from "./src/sockets/mainSocket";

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

mainSocket(io);

server.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk.blue(`Listening on: http://localhost:${process.env.PORT || 8000}`)
  );
  connectToDb();
});
