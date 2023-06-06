import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

// NOTE: optimally move this into a separate file
export interface User {
  email: string;
  password: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { removeItem, setItem } = useLocalStorage();

  const addUser = (user: any) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser };
};
