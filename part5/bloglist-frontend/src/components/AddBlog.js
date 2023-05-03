const AddBlog = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  addBlog,
}) => (
  <form onSubmit={addBlog}>
    <h3>Add a new blog:</h3>
    <div>
      Title:
      <input type="text" value={title} name="Title" onChange={setTitle} />
    </div>
    <div>
      Author:
      <input type="text" value={author} name="Author" onChange={setAuthor} />
    </div>
    <div>
      URL:
      <input type="text" value={url} name="URL" onChange={setUrl} />
    </div>
    <button type="submit">Submit</button>
  </form>
);

export default AddBlog;
