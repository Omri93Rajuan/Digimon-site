import { Response } from "express";
import { generateUserPassword } from "../../helpers/bcrypt";
import User, { IUser } from "../models/user";
import { handleBadRequest } from "../../utils/ErrorHandle";

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error: any) {
        return handleBadRequest("MongoDB", error);
    }
};

const getUserById = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error: any) {
        return handleBadRequest("MongoDB", error);
    }
};

const addUser = async (userData: IUser) => {
    try {
        if (!userData.email || !userData.password) {
            throw new Error("Missing required fields");
        }

        const newUser = new User(userData);
        newUser.password = generateUserPassword(newUser.password);
        await newUser.save();
        return newUser;
    } catch (error: any) {
        return handleBadRequest("MongoDB", error);
    }
};

const updateUser = async (userId: string, updateData: Partial<IUser>) => {
    try {
        if (updateData.password) {
            throw new Error("Password cannot be updated through this endpoint");
        }

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw new Error("User not found");
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                ...updateData,
                password: existingUser.password 
            },
            { 
                new: true,
                runValidators: true
            }
        );

        return updatedUser;
    } catch (error: any) {
        return handleBadRequest("MongoDB", error);
    }
};

const deleteUser = async (userId: string) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return { message: "User deleted successfully" };
    } catch (error: any) {
        return handleBadRequest("MongoDB", error);
    }
};
export {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};