import { config } from "../data/config";
import axios from "axios";
import ITodo from "../interfaces/ITodo";

export const getTodos = async () => {
  const { data } = await axios.get(`${config.todos.todosConnectionString}`);
  return data;
};

export const markTodoCompleted = async (todo: ITodo) => {
  const {
    data,
  } = await axios.put(`${config.todos.todosConnectionString}/${todo.id}`, {
    userId: todo.userId,
    id: todo.id,
    title: todo.title,
    completed: true,
  });
  return data;
};
