import mongoose, { Document, Schema } from "mongoose";

export interface IAnime extends Document {
  name: string;
  description: string;
  releaseYear: number;
  season: number;
  episode: number;
  digimons: { id: string }[];
  image: string;
  link: string;
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
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(v);
        },
        message: "הקישור אינו חוקי",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAnime>("Anime", animeSchema);
