import { config } from "../data/config";
import axios from "axios";

export const getUsers = async () => {
  const { data } = await axios.get(`${config.users.usersConnectionString}`);
  return data;
};

export const getUserById = async (userId: string) => {
  const { data } = await axios.get(
    `${config.users.usersConnectionString}/${userId}`
  );
  return data;
};
