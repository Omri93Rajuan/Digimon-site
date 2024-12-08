import { handleBadRequest } from "../utils/ErrorHandle";
import Room, { IRoom } from "../models/room";

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
      throw new Error("Anime not found");
    }

    return anime;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateAnime = async (animeId: string, updateData: Partial<IRoom>) => {
  try {
    const existingAnime = await Room.findById(animeId);
    if (!existingAnime) {
      throw new Error("Anime not found");
    }

    const updatedAnime = await Room.findByIdAndUpdate(animeId, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedAnime;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteAnime = async (animeId: string) => {
  try {
    const deletedAnime = await Room.findByIdAndDelete(animeId);
    if (!deletedAnime) {
      throw new Error("Anime not found");
    }
    return { message: "Anime deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { getRoomByName, updateAnime, deleteAnime };
