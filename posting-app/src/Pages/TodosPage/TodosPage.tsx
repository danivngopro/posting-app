import TodosGrid from "./components/TodosGrid";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/usersService";
import Spinner from "react-bootstrap/Spinner";
import { getTodos } from "../../services/todosServices";
import ITodo from "../../interfaces/ITodo";

export default function TodosPage() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [todos, setTodos] = useState([]);

  const calculateTodos = () => {
    if (userId) {
      return todos.filter((todo: ITodo) => todo.userId == userId);
    }
    return todos;
  };

  useEffect(() => {
    const fatchTodos = async () => {
      const tempTodos = await getTodos();
      setTodos(tempTodos);
    };

    fatchTodos();
  }, [userId]);

  return (
    <div>
      {todos.length > 0 ? (
        <TodosGrid todos={calculateTodos()} />
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
    </div>
  );
}
