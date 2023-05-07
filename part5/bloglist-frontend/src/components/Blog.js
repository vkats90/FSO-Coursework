import { useState } from "react";
const blogStyle = {
  border: "1px solid black",
  borderRadius: 5,
  padding: 5,
  width: 500,
  margin: 5,
};
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
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
        likes: {blog.likes} <button>like</button> <br />
        {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
