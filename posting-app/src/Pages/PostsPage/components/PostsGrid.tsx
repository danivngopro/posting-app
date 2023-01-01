import IPost from "../../../interfaces/IPost";
import { getPostComments } from "../../../services/postsService";
import { useState, useEffect } from "react";

interface Props {
  posts: IPost[];
  name: string;
}

const PostsGrid = ({ posts, name }: Props) => {
  const [comments, setComments] = useState<{ id: string; numComments: number; }[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const tempComments = await Promise.all(
        posts.map(async (post) => {
          return {
            id: post.id,
            numComments: await getPostComments(post.id as unknown as number),
          } as { id: string; numComments: number };
        })
      );
      setComments(tempComments);
    };
    fetchComments();
  }, [posts]);

  return (
    <div className="row mt-4 ms-4">
      {posts.map((post) => {
        const postComments = comments.find((c) => c.id === post.id);
        return (
          <div
            className="col-md-3 col-sm-6 col-12 mb-4"
            key={post.id}
            style={{ marginLeft: "3rem", marginRight: "4.2rem" }}
          >
            <div
              className="card shadow border border-black"
              style={{ margin: "0 2px", width: "300px" }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Name: </strong>
                  {name}
                </h5>
                <div className="card-text">
                  <strong>Post title: </strong> {post.title}
                </div>
                <div className="card-text">
                  <strong>comments: </strong>
                  <div>
                    {postComments ? postComments.numComments : "Loading..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostsGrid;
