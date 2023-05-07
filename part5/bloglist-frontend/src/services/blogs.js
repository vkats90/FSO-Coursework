import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

let token = null;

const setToken = (newToken) => {
  token = "bearer " + newToken;
};

const addBlog = async ({ title, author, url }) => {
  try {
    const blog = await axios.post(
      baseUrl,
      { title, author, url },
      { headers: { Authorization: token } }
    );
    return blog.data;
  } catch (error) {
    return error.response.data;
  }
};

const addLike = async (blog) => {
  try {
    await axios.put(baseUrl + "/" + blog.id, blog, {
      headers: { Authorization: token },
    });
  } catch (error) {
    return error.response.data;
  }
};

const deleteBlog = async (blog) => {
  try {
    await axios.delete(baseUrl + "/" + blog.id, {
      headers: { Authorization: token },
    });
  } catch (error) {
    return error.response.data;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addBlog, addLike, deleteBlog };
