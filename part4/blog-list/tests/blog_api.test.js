const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const innitialBlog = [
  {
    title: "A new hope",
    author: "George Lucas",
    url: "google it",
    likes: 1,
  },
  {
    title: "Mama's secret stash",
    author: "Mama",
    url: "www.itsnotweed.com",
    likes: 254,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let x of innitialBlog) {
    let blog = new Blog(x);
    await blog.save();
  }
});

describe("testing GET", () => {
  test("server returns blogs", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned blogs are of the right length", async () => {
    const blogs = await api.get("/api/blogs");

    expect(blogs.body).toHaveLength(innitialBlog.length);
  });

  test("expect returned blogs to include a certain note", async () => {
    const blogs = await api.get("/api/blogs");

    blogs.body.map((x) => (x.id = undefined));
    expect(blogs.body).toContainEqual(innitialBlog[0]);
  });

  test("returned blogs include an id property", async () => {
    const blogs = await api.get("/api/blogs");

    blogs.body.map((x) => {
      expect(x.id).toBeDefined;
      expect(x._id).not.toBeDefined;
    });
  });
});

describe("testing POST", () => {
  let newBlog = {
    title: "Papa's new Mercedes",
    author: "Vengeful wife",
    url: "I made it up",
    likes: 12,
  };

  test("check that I can submit a post request", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("expect new length to be 1 higher than before", async () => {
    await api.post("/api/blogs").send(newBlog);

    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(innitialBlog.length + 1);
  });

  test("check that the new note is included in the database", async () => {
    await api.post("/api/blogs").send(newBlog);

    const blogs = await api.get("/api/blogs");
    blogs.body.map((x) => (x.id = undefined));
    expect(blogs.body).toContainEqual(newBlog);
  });
});

describe("testing POST with missing fields", () => {
  test("check a note without likes defaults to zero", async () => {
    let zeroLikesBlog = {
      title: "My Recipe Book",
      author: "Makenzie Carr",
      url: "http",
    };
    console.log(zeroLikesBlog);
    await api.post("/api/blogs").send(zeroLikesBlog);

    const response = await api.get("/api/blogs");
    const post = response.body.filter((x) => x.title === zeroLikesBlog.title);
    expect(post[0].likes).toBe(0);
  });

  test("check a note without a title returns a bad request", async () => {
    let noTitleBlog = {
      author: "Makenzie Carr",
      url: "http",
      likes: 2,
    };

    const response = await api.post("/api/blogs").send(noTitleBlog).expect(400);

    expect(response.body.error).toBe(
      "Blog validation failed: title: Blog title is required"
    );
  });
  test("check a note without a url returns a bad request", async () => {
    let noURLBlog = {
      title: "My Recipe Book",
      author: "Makenzie Carr",
      likes: 2,
    };

    const response = await api.post("/api/blogs").send(noURLBlog).expect(400);

    expect(response.body.error).toBe(
      "Blog validation failed: url: URL is required"
    );
  });
  test("check a note without a url and a title returns a bad request", async () => {
    let badBlog = {
      author: "Makenzie Carr",
      likes: 2,
    };

    const response = await api.post("/api/blogs").send(badBlog).expect(400);

    expect(response.body.error).toBe(
      "Blog validation failed: url: URL is required, title: Blog title is required"
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
