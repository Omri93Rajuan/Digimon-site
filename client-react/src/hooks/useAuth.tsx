import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, logout, login } = context;

  return { user, logout, login };
};
