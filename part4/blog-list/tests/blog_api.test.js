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
  test("server returns notes", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned notes are of the right length", async () => {
    const notes = await api.get("/api/blogs");

    expect(notes.body).toHaveLength(innitialBlog.length);
  });
});

test("expect returns notes to include a certain note", async () => {
  const notes = await api.get("/api/blogs");

  expect(notes.body).toContainEqual(innitialBlog[0]);
});

afterAll(async () => {
  await mongoose.connection.close();
});
