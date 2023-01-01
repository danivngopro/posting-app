import IPost from "../../interfaces/IPost";
import PostsGrid from "./components/PostsGrid";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/postsService";
import { getUserById } from "../../services/usersService";
import Spinner from "react-bootstrap/Spinner";

export default function PostsPage() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");

  const calculatePosts = () => {
    return posts.filter((post: IPost) => post.userId == userId);
  };

  useEffect(() => {
    const fatchPosts = async () => {
      const tempPosts = await getPosts();
      setPosts(tempPosts);
    };

    const fatchUserId = async () => {
      const tempName = await getUserById(userId);
      setUserName(tempName.name);
    };

    fatchPosts();
    fatchUserId();
  }, [userId]);

  return (
    <div>
      {posts.length > 0 ? (
        <PostsGrid posts={calculatePosts()} name={userName} />
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
    </div>
  );
}
