import IPost from "../../../interfaces/IPost";

interface Props {
  posts: IPost[];
}

const PostsGrid = ({ posts }: Props) => {
  return (
    <div className="row mt-4 ms-4">
      {posts.map((post) => (
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
              <h5 className="card-title"><strong>Post title:</strong>{post.title}</h5>
              <div className="card-text">
                <strong>Post title:</strong> {'temp'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsGrid;
