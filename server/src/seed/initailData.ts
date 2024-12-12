import fs from "fs";
import bcrypt from "bcrypt";
import User from "../models/user";
import { Product } from "../models/product";
import { Category } from "../models/category";
import Order from "../models/order";

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
 * Loads initial data into the database if any collections are empty.
 * Reads data from JSON files, encrypts passwords, and inserts data into the database.
 */

async function loadInitialData() {
  try {
    // Read data from JSON files
    const userData = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const productData = JSON.parse(
      fs.readFileSync("./data/products.json", "utf8")
    );
    const categoryData = JSON.parse(
      fs.readFileSync("./data/categorys.json", "utf8")
    );
    const orderData = JSON.parse(fs.readFileSync("./data/orders.json", "utf8"));

    // Check if any of the collections are empty
    const isUserEmpty = (await User.countDocuments()) === 0;
    const isProductEmpty = (await Product.countDocuments()) === 0;
    const isCategoryEmpty = (await Category.countDocuments()) === 0;
    const isOrderEmpty = (await Order.countDocuments()) === 0;

    if (isUserEmpty || isProductEmpty || isCategoryEmpty || isOrderEmpty) {
      // Encrypt passwords before inserting into the database
      const encryptedUserData = await encryptPasswords(userData);

      // Insert users if the collection is empty
      if (isUserEmpty) {
        await User.insertMany(encryptedUserData);
        console.log("Initial users have been added to the database.");
      } else {
        console.log("Users already exist in the database.");
      }

      // Insert products if the collection is empty
      if (isProductEmpty) {
        await Product.insertMany(productData);
        console.log("Initial products have been added to the database.");
      } else {
        console.log("Products already exist in the database.");
      }

      // Insert categories if the collection is empty
      if (isCategoryEmpty) {
        await Category.insertMany(categoryData);
        console.log("Initial categories have been added to the database.");
      } else {
        console.log("Categories already exist in the database.");
      }

      // Insert orders if the collection is empty
      if (isOrderEmpty) {
        await Order.insertMany(orderData);
        console.log("Initial orders have been added to the database.");
      } else {
        console.log("Orders already exist in the database.");
      }
    } else {
      console.log("All data already exists in the database.");
    }
  } catch (error) {
    console.error("Error loading initial data:", error);
  }
}

export default loadInitialData;
