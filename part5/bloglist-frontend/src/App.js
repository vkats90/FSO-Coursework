import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/users";
import AddBlog from "./components/AddBlog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const noteFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const localStorage = window.localStorage.getItem("user");
    // need to test if token is still valid too, but it's not required in this exercise
    if (localStorage) {
      setUser(JSON.parse(localStorage));
      blogService.setToken(JSON.parse(localStorage).token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    console.log(`${username} is logging in`);

    let loggedUser = await loginService.login({ username, password });

    if (loggedUser.error) {
      setMessage(loggedUser.error);
      setColor("red");
      setTimeout(() => setMessage(""), 3000);
      return console.log(JSON.stringify(loggedUser));
    }

    console.log(`${loggedUser.data.name} has logged in`);
    window.localStorage.setItem("user", JSON.stringify(loggedUser.data));
    setUser(loggedUser.data);
    blogService.setToken(loggedUser.data.token);
    setMessage(`${loggedUser.data.username} logged in`);
    setColor("darkgreen");
    setTimeout(() => setMessage(""), 3000);
  };
  const handleAddBlog = async ({ title, author, url }) => {
    const blog = await blogService.addBlog({ title, author, url });
    if (blog.error) {
      setMessage(blog.error);
      setColor("red");
      setTimeout(() => setMessage(""), 3000);
      return console.log(blog);
    }

    blog.user = user;
    noteFormRef.current.toggleVisibility();
    console.log(`added blog: ${blog.title}`);
    setBlogs(blogs.concat(blog));
    setMessage(`Added blog ${blog.title}`);
    setColor("darkgreen");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("user");
    setMessage(`See you later  ${user.name}`);
    setColor("darkgreen");
    setTimeout(() => setMessage(""), 3000);
    setUser(null);
  };

  return (
    <div>
      {message && <Notification message={message} color={color} />}
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <h3>Welcome back {user.name}!</h3>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          <Toggable text="Add a note" ref={noteFormRef}>
            <AddBlog addBlog={handleAddBlog} />
          </Toggable>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
