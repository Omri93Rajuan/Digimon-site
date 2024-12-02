import { handleBadRequest } from "../utils/ErrorHandle";
import Digimon, { IDigimon } from "../models/digimon";

const getAllDigimons = async () => {
  try {
    const digimons = await Digimon.find();
    return digimons;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getDigimonById = async (digimonId: string) => {
  try {
    const digimon = await Digimon.findById(digimonId);
    if (!digimon) {
      throw new Error("Digimon not found");
    }
    return digimon;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const addDigimon = async (digimonData: IDigimon) => {
  try {
    if (!digimonData.name || !digimonData.season || !digimonData.movie) {
      throw new Error("Missing required fields");
    }

    const newDigimon = new Digimon(digimonData);
    await newDigimon.save();
    return newDigimon;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateDigimon = async (
  digimonId: string,
  updateData: Partial<IDigimon>
) => {
  try {
    const existingDigimon = await Digimon.findById(digimonId);
    if (!existingDigimon) {
      throw new Error("Digimon not found");
    }

    const updatedDigimon = await Digimon.findByIdAndUpdate(
      digimonId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedDigimon;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteDigimon = async (digimonId: string) => {
  try {
    const deletedDigimon = await Digimon.findByIdAndDelete(digimonId);
    if (!deletedDigimon) {
      throw new Error("Digimon not found");
    }
    return { message: "Digimon deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export {
  getAllDigimons,
  getDigimonById,
  addDigimon,
  updateDigimon,
  deleteDigimon,
};
