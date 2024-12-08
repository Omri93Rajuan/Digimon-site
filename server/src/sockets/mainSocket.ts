import { Server } from "socket.io";
import roomSocket from "./socket/roomSocketContorller";

export default function mainSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);
    roomSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected ${socket.id}`);
    });
  });
}
