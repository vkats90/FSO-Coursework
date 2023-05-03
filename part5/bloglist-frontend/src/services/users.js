import axios from "axios";
const baseUrl = "/api/login";

const login = async ({ username, password }) => {
  try {
    return await axios.post(baseUrl, { username, password });
  } catch (error) {
    return { error: "Username or Password are incorrect" };
  }
};

export default { login };
