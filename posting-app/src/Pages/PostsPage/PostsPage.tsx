import IPost from "../../interfaces/IPost";
import PostsGrid from "./components/PostsGrid";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/postsService";
import Spinner from "react-bootstrap/Spinner";

export default function PostsPage() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [posts, setPosts] = useState([]);

  const calculatePosts = () => {
    return posts.filter((post: IPost) => post.userId == userId);
  };

  useEffect(() => {
    const fatchPosts = async () => {
      const tempPosts = await getPosts();
      setPosts(tempPosts);
    };

    fatchPosts();
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        <PostsGrid posts={calculatePosts()} />
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
    </div>
  );
}
