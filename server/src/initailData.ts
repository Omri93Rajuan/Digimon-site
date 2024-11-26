import fs from "fs";
import bcrypt from "bcrypt";
import User from "./models/user"; // Your User model

/**
 * Encrypts passwords for all users in the provided data array.
 * @param userData - Array of user objects containing plaintext passwords.
 * @returns A promise that resolves to the user data array with encrypted passwords.
 */
async function encryptPasswords(userData: any[]) {
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
 * Loads initial user data into the database if no users exist.
 * Reads user data from a JSON file, encrypts passwords, and inserts data into the database.
 */
async function loadInitialData() {
  // Read user data from a JSON file
  const userData = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));

  // Check if the database is empty
  if ((await User.countDocuments()) === 0) {
    // Encrypt passwords before inserting into the database
    const encryptedUserData = await encryptPasswords(userData);
    await User.insertMany(encryptedUserData);
    console.log("Initial users have been added to the database.");
  } else {
    console.log("Users already exist in the database.");
  }
}

export default loadInitialData;
