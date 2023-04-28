const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);
  if (!blog.user) {
    let users = await User.find({});
    let random = Math.floor(Math.random() * users.length);
    blog.user = users[random].id;
  }

  try {
    const result = await blog.save();
    const user = await User.findById(result.user);
    user.blogs.push(result.id);
    console.log(user);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      await Blog.findByIdAndRemove(request.params.id);
      response
        .status(204)
        .json({ success: `Blog ${request.params.id} removed` });
    } else
      response.status(400).json({ error: "blog with this id does not exist" });
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
