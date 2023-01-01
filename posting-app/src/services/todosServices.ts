import { config } from "../data/config";
import axios from "axios";

export const getTodos = async () => {
  const { data } = await axios.get(`${config.todos.todosConnectionString}`);
  return data;
};
