import { config } from "../data/config";
import axios from "axios";

export const getPosts = async () => {
  const { data } = await axios.get(`${config.posts.postsConnectionString}`);
  return data;
};

export const getPostComments = async (postId: number) => {
  const { data } = await axios.get(
    `${config.posts.postsConnectionString}/${postId}/comments`
  );
  return data.length;
};
