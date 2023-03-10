import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "./Pages/HomePage/HomePage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import TodosPage from "./Pages/TodosPage/TodosPage";
import Navbar from "./components/form/Navbar";

function App() {
  return (
    <Box>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Posts/:id" element={<PostsPage />} />
          <Route path="/Posts" element={<PostsPage />} />
          <Route path="/Todos/:id" element={<TodosPage />} />
          <Route path="/Todos" element={<TodosPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
