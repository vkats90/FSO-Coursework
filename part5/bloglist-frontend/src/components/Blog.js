import { useState } from "react";

const blogStyle = {
  border: "1px solid black",
  borderRadius: 5,
  padding: 5,
  width: 500,
  margin: 5,
};
const Blog = ({ blog, handleAddLike, username, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const addLike = () => {
    blog.likes = blog.likes + 1;
    handleAddLike(blog);
  };

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <span style={{ fontStyle: "italic", color: "gray" }}>
        -{blog.author}{" "}
      </span>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "show"}
      </button>
      <div style={{ display: visible ? "none" : "" }}></div>
      <div style={{ display: visible ? "" : "none" }}>
        <div>{blog.url}</div>
        likes: {blog.likes} <button onClick={addLike}>like</button> <br />
        {blog.user.name} <br />
        {blog.user.username === username ? (
          <button
            style={{
              background: "red",
              color: "white",
              borderColor: "white",
            }}
            onClick={() => handleDelete(blog)}
          >
            delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
