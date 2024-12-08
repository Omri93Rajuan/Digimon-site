import fs from "fs";
import bcrypt from "bcrypt";
import User, { IUser } from "./models/user";
import Digimon, { IDigimon } from "./models/digimon";
import Anime, { IAnime } from "./models/anime";
import Room, { IRoom } from "./models/room";

/**
 * Encrypts passwords for all users in the provided data array.
 * @param userData - Array of user objects containing plaintext passwords.
 * @returns A promise that resolves to the user data array with encrypted passwords.
 */
async function encryptPasswords(userData: IUser[]) {
  return Promise.all(
    userData.map(async (user) => {
      if (user.password) {
        // Hash the password using bcrypt
        user.password = await bcrypt.hash(user.password, 10);
      }
      return user;
    })
  );
}

/**
 * Loads initial data into the database if the collections are empty.
 * Reads data from JSON files, encrypts passwords (for users), and inserts data into the database.
 */
async function loadInitialData() {
  try {
    // Read user data from a JSON file
    const userData: IUser[] = JSON.parse(
      fs.readFileSync("./data/users.json", "utf8")
    );

    // Read digimon data from a JSON file
    const digimonData: IDigimon[] = JSON.parse(
      fs.readFileSync("./data/digimons.json", "utf8")
    );

    // Read movie data from a JSON file
    const movieData: IAnime[] = JSON.parse(
      fs.readFileSync("./data/anime.json", "utf8")
    );
    const roomData: IRoom[] = JSON.parse(
      fs.readFileSync("./data/room.json", "utf8")
    );

    // Check if the collections are empty
    if (
      (await User.countDocuments()) === 0 &&
      (await Digimon.countDocuments()) === 0 &&
      (await Anime.countDocuments()) === 0 &&
      (await Room.countDocuments()) === 0
    ) {
      // Encrypt passwords before inserting user data into the database
      const encryptedUserData = await encryptPasswords(userData);
      await User.insertMany(encryptedUserData);
      await Digimon.insertMany(digimonData);
      await Anime.insertMany(movieData);
      await Room.insertMany(roomData);

      console.log("Initial data has been added to the database.");
    } else {
      console.log("Data already exists in the database.");
    }
  } catch (error) {
    console.error("Error loading initial data:", error);
  }
}
export default loadInitialData;
