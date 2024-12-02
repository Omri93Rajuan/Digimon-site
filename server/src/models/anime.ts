import mongoose, { Document, Schema } from "mongoose";

export interface IAnime extends Document {
  name: string;
  description: string;
  releaseYear: number;
  season: number;
  episode: number;
  digimons: { digimon: string; id: string }[];
}

const animeSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
    episode: {
      type: Number,
      required: true,
    },
    digimons: [
      {
        digimon: {
          type: String,
          required: true,
        },
        id: {
          type: Schema.Types.ObjectId,
          ref: "Digimon",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAnime>("Anime", animeSchema);
