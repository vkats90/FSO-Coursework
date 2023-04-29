const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
  const checkToken = jwt.verify(request.token, process.env.SECRET);
  if (!checkToken) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(checkToken.id);

  const blog = new Blog(request.body);
  blog.user = user.id;

  try {
    const result = await blog.save();
    user.blogs.push(result.id);
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
