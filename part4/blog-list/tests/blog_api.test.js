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
    likes: 0,
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

afterAll(async () => {
  await mongoose.connection.close();
});
