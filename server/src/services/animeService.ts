import { handleBadRequest } from "../utils/ErrorHandle";
import Anime, { IAnime } from "../models/anime";

const getAllAnimes = async () => {
  try {
    const animes = await Anime.find();
    return animes;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getAnimeById = async (animeId: string) => {
  try {
    const anime = await Anime.findById(animeId).populate("Miki");
    if (!anime) {
      throw new Error("Anime not found");
    }

    return anime;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const addAnime = async (animeData: IAnime) => {
  try {
    if (!animeData.name || !animeData.season || !animeData.episode) {
      throw new Error("Missing required fields");
    }

    const newAnime = new Anime(animeData);
    await newAnime.save();
    return newAnime;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateAnime = async (animeId: string, updateData: Partial<IAnime>) => {
  try {
    const existingAnime = await Anime.findById(animeId);
    if (!existingAnime) {
      throw new Error("Anime not found");
    }

    const updatedAnime = await Anime.findByIdAndUpdate(animeId, updateData, {
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
    const deletedAnime = await Anime.findByIdAndDelete(animeId);
    if (!deletedAnime) {
      throw new Error("Anime not found");
    }
    return { message: "Anime deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { getAllAnimes, getAnimeById, addAnime, updateAnime, deleteAnime };
