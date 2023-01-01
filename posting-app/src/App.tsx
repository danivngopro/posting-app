import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "./Pages/HomePage/HomePage";
import PostsPage from "./Pages/PostsPage/PostsPage";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Posts/:id" element={<PostsPage />} />
      </Routes>
    </Box>
  );
}

export default App;
