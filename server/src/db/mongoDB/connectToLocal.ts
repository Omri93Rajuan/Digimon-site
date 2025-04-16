import mongoose from "mongoose";
import chalk from "chalk";

mongoose
  .connect("mongodb://localhost:27017/pika-pika")
  .then(() => console.log(chalk.magentaBright("Connected to MongoDB Locally!")))
  .catch((error) =>
    console.log(
      chalk.redBright.bold(
        `Could not connect to MongoDB: ${(error as Error).message}`
      )
    )
  );
