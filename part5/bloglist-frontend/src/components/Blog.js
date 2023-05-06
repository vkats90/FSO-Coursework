const Blog = ({ blog }) => (
  <div>
    {blog.title} -{" "}
    <span style={{ fontStyle: "italic", color: "gray" }}>{blog.author}</span>
  </div>
);

export default Blog;
