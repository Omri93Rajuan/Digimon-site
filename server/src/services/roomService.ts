import { handleBadRequest } from "../utils/ErrorHandle";
import Room, { IMessage, IRoom } from "../models/room";

const getAllRooms = async () => {
  try {
    const animes = await Room.find();
    return animes;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getRoomByName = async (roomName: string) => {
  try {
    const anime = await Room.findOne({ roomName: roomName });
    if (!anime) {
      throw new Error("Room not found");
    }

    return anime;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateRoom = async (roomName: string, updateData: IMessage) => {
  try {
    const existingRoom = await Room.findOne({ roomName: roomName });
    if (!existingRoom) {
      throw new Error("Room not found");
    }

    existingRoom.messages.push(updateData);
    await existingRoom.save();
    return existingRoom;
  } catch (error) {
    console.error("Error in updateRoom:", error);
    throw error;
  }
};

export { getRoomByName, updateRoom };
