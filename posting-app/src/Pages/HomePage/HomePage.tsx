import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/postsService";
import { getUsers } from "../../services/usersService";
import UserGrid from "./components/UserGrid";
import Spinner from "react-bootstrap/Spinner";
import { getTodos } from "../../services/todosServices";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fatchUsers = async () => {
      const tempusers = await getUsers();
      setUsers(tempusers);
    };

    const fatchPosts = async () => {
      const tempPosts = await getPosts();
      setPosts(tempPosts);
    };

    const fatchTodos = async () => {
      const tempTodos = await getTodos();
      setTodos(tempTodos);
    };

    fatchUsers();
    fatchPosts();
    fatchTodos();
  }, []);

  return (
    <div>
      {users.length > 0 && posts.length > 0 && todos.length > 0 ? (
        <UserGrid users={users} posts={posts} todos={todos} />
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
    </div>
  );
}
