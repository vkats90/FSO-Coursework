import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/users";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const localStorage = window.localStorage.getItem("user");
    if (localStorage) setUser(JSON.parse(localStorage));
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`${username} is logging in`);

    let loggedUser = await loginService.login({ username, password });

    if (loggedUser.error) return console.log(JSON.stringify(loggedUser));

    console.log(`${loggedUser.data.name} has logged in`);
    window.localStorage.setItem("user", JSON.stringify(loggedUser.data));
    setUser(loggedUser.data);
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
        />
      )}
      {user && (
        <div>
          <h3>Welcome back {user.name}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
