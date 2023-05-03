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
    console.log("TOKEN:", token);
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addBlog };
