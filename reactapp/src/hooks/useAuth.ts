import { useEffect } from "react";
import { useUser, User } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = async (values: User) => {
    const response = await axios.post(
      "http://localhost:5200/Auth/login",
      values,
      {
        withCredentials: true,
      }
    );
    addUser(response.data);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
