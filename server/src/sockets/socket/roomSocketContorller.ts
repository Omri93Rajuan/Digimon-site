import { Server, Socket } from "socket.io";
import { getRoomByName, updateRoom } from "../../services/roomService";

const roomSocket = (io: Server, socket: Socket) => {
  socket.on("joinRoom", async (roomName) => {
    try {
      if (!roomName) {
        console.error("Invalid room name");
        socket.emit("error", "Room name is required");
        return;
      }
      //find the room
      const room = await getRoomByName(roomName);

      if (!room) {
        console.error("Room not found");
        socket.emit("error", "Room not found");
        return;
      }
      socket.emit("loadMessages", room.messages);

      socket.join(roomName);
    } catch (error) {
      console.error("Error in joinRoom:", error);
      socket.emit("error", "Failed to join room");
    }
  });

  socket.on("sendMessageToRoom", async (data) => {
    try {
      const { roomName, message, userName, timeStamp } = data;

      if (!roomName || !message || !userName || !timeStamp) {
        return;
      }

      await updateRoom(roomName, {
        message,
        userName,
        timeStamp,
      });

      io.to(roomName).emit("receiveMessage", {
        userName,
        message,
        timeStamp,
      });
    } catch (error) {
      console.error("Error in sendMessageToRoom:", error);
      socket.emit("error", "Failed to send message");
    }
  });
};

export default roomSocket;
