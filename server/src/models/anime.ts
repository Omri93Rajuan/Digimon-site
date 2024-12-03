import mongoose, { Document, Schema } from "mongoose";

export interface IAnime extends Document {
  name: string;
  description: string;
  releaseYear: number;
  season: number;
  episode: number;
  digimons: { id: string }[];
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
        id: {
          type: Schema.Types.ObjectId,
          ref: "Digimon",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IAnime>("Anime", animeSchema);
