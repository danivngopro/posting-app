import { Link } from "react-router-dom";
import IPost from "../../../interfaces/IPost";
import IUser from "../../../interfaces/IUser";

interface Props {
  users: IUser[];
  posts: IPost[];
}

const UserGrid = ({ users, posts }: Props) => {

  const calculatePosts = (userId: string) => {
    return posts.filter((post: IPost) => post.userId === userId).length;
  };

  return (
    <div className="row mt-4 ms-4">
      {users.map((user) => (
        <div
          className="col-md-3 col-sm-6 col-12 mb-4"
          key={user.id}
          style={{ marginLeft: "3rem", marginRight: "4.2rem" }}
        >
          <div
            className="card shadow border border-black"
            style={{ margin: "0 2px", width: "300px" }}
          >
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <div className="card-text">
                <strong>Email:</strong> {user.email}
                <br />
                <strong>Phone:</strong> {user.phone}
                <br />
                <strong>Company:</strong> {user.company.name}
              </div>
              <Link to={`/Posts/${user.id}`} className="card-link">
                Posts: {calculatePosts(user.id)}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGrid;
