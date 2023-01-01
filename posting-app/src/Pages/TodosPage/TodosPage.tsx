import IPost from "../../interfaces/IPost";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/usersService";
import Spinner from "react-bootstrap/Spinner";
import { getTodos } from "../../services/todosServices";
import TodosGrid from "./components/TodosGrid";

export default function TodosPage() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [todos, setTodos] = useState([]);
  const [userName, setUserName] = useState("");

  const calculateTodos = () => {
    return todos.filter((post: IPost) => post.userId == userId);
  };

  useEffect(() => {
    const fatchTodos = async () => {
      const tempTodos = await getTodos();
      setTodos(tempTodos);
    };

    const fatchUserId = async () => {
      const tempName = await getUserById(userId);
      setUserName(tempName.name);
    };

    fatchTodos();
    fatchUserId();
  }, [userId]);

  return (
    <div>
      {todos.length > 0 ? (
        <TodosGrid />
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
    </div>
  );
}
