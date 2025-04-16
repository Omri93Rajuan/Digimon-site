import mongoose from "mongoose";
import chalk from "chalk";

const NAME: string = process.env.DB_NAME || "";
const PASSWORD: string = process.env.DB_PASSWORD || "";

const connectToMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb+srv://${NAME}:${PASSWORD}@digimonweb.67z03q8.mongodb.net/pika-pika`
    );
    console.log(chalk.magentaBright("Connected to MongoDB Atlas!"));
  } catch (error) {
    console.log(
      chalk.redBright.bold(
        `Could not connect to MongoDB: ${(error as Error).message}`
      )
    );
  }
};

connectToMongo();
