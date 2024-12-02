import mongoose, { Document, Schema } from "mongoose";

export interface IDigimon extends Document {
  name: string;
  description: string;
  season: number;
  movie: string;
  evolutions: string[];
}

const digimonSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
    movie: {
      type: String,
      required: true,
    },
    evolutions: {
      type: [{ type: Schema.Types.ObjectId, ref: "Digimon" }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDigimon>("Digimon", digimonSchema);
