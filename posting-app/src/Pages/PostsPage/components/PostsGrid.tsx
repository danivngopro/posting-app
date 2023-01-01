import IPost from "../../../interfaces/IPost";
import {
  getPostById,
  getPostComments,
  getPostCommentsLength,
} from "../../../services/postsService";
import { useState, useEffect, PureComponent } from "react";
import Modal from "react-modal";
import IComment from "../../../interfaces/IComment";
import { stringify } from "querystring";
import { getUserById } from "../../../services/usersService";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  posts: IPost[];
  name: string;
}

const PostsGrid = ({ posts, name }: Props) => {
  const [names, setNames] = useState<{ id: string; name: string }[]>([]);
  const [comments, setComments] = useState<
    { id: string; numComments: number }[]
  >([]);

  const [pureComments, setPureComments] = useState<
    { id: string; comments: IComment[] }[]
  >([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  const openModal = (postId: string) => {
    setModalIsOpen(true);
    setSelectedPostId(postId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const tempComments = await Promise.all(
        posts.map(async (post) => {
          return {
            id: post.id,
            numComments: await getPostCommentsLength(
              (post.id as unknown) as number
            ),
          } as { id: string; numComments: number };
        })
      );
      setComments(tempComments);
    };

    const fetchCommentsPure = async () => {
      const tempComments = await Promise.all(
        posts.map(async (post) => {
          return {
            id: post.id,
            comments: await getPostComments((post.id as unknown) as number),
          } as { id: string; comments: IComment[] };
        })
      );
      setPureComments(tempComments);
    };

    const getNames = async () => {
      console.log(123)
      const tempNames = await Promise.all(
        posts.map(async (post) => {
          const { userId } = await getPostById(post.id);
          const { name } = await getUserById(userId);
          return {
            id: post.id,
            name: name,
          } as { id: string; name: string };
        })
      );
      setNames(tempNames);
    };

    console.log(name)

    fetchCommentsPure();
    fetchComments();
    if (!name) {
      getNames();
    }
  }, [posts, name]);

  return (
    <div className="row mt-4 ms-4">
      {names.length > 0 ? (
        posts.map((post) => {
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
                    {name
                      ? name
                      : names.filter((obj) => obj.id === post.id)[0].name}
                  </h5>
                  <div className="card-text">
                    <strong>Post title: </strong> {post.title}
                  </div>
                  <div className="card-text d-flex gap-2">
                    <strong>comments: </strong>
                    <a href="#" onClick={() => openModal(post.id)}>
                      {postComments ? postComments.numComments : "Loading..."}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          content: {
            width: "800px",
            height: "700px",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            border: "5px solid lightblue",
          },
        }}
      >
        <div>
          {pureComments
            .filter((obj) => obj.id === selectedPostId)[0]
            ?.comments?.map((comment, index) => {
              return (
                <div key={index} className="card shadow border border-black">
                  <div className="card-body">
                    <h5 className="card-title">
                      <strong>Post name: </strong>
                      {comment.name}
                    </h5>
                    <div className="card-text">
                      <strong>email: </strong> {comment.email}
                    </div>
                    <div className="card-text d-flex gap-2">
                      <strong>comment: </strong>
                      {comment.body}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PostsGrid;
