const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

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

let token = "";
let initUser;

beforeAll(async () => {
  await User.deleteMany({});
  const innitialUser = {
    username: "marsimillian77",
    name: "vlad",
    password: "123456",
  };
  initUser = await api.post("/api/users").send(innitialUser);
  initUser = initUser.body;

  const authUser = await api
    .post("/api/login")
    .send({ username: "marsimillian77", password: "123456" });
  token = "bearer " + authUser.body.token;
  console.log("TOKEN:", token);
});

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let x of innitialBlog) {
    x.user = initUser.id;
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

    blogs.body.map((x) => {
      x.id = undefined;
      x.user = undefined;
    });
    const blog = { ...innitialBlog[0], user: undefined };
    expect(blogs.body).toContainEqual(blog);
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

  test("when not providing the auth token the server returns a 401", async () => {
    let response = await api.post("/api/blogs").send(newBlog).expect(401);

    expect(response.body.error).toBe("jwt must be provided");
  });

  test("check that I can submit a post request", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ authorization: token })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("expect new length to be 1 higher than before", async () => {
    await api.post("/api/blogs").send(newBlog).set({ authorization: token });

    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(innitialBlog.length + 1);
  });

  test("check that the new note is included in the database", async () => {
    await api.post("/api/blogs").send(newBlog).set({ authorization: token });

    const blogs = await api.get("/api/blogs");
    blogs.body.map((x) => {
      x.id = undefined;
      x.user = undefined;
    });
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
    await api
      .post("/api/blogs")
      .send(zeroLikesBlog)
      .set({ authorization: token });

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

    const response = await api
      .post("/api/blogs")
      .send(noTitleBlog)
      .expect(400)
      .set({ authorization: token });

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

    const response = await api
      .post("/api/blogs")
      .send(noURLBlog)
      .set({ authorization: token })
      .expect(400);

    expect(response.body.error).toBe(
      "Blog validation failed: url: URL is required"
    );
  });
  test("check a note without a url and a title returns a bad request", async () => {
    let badBlog = {
      author: "Makenzie Carr",
      likes: 2,
    };

    const response = await api
      .post("/api/blogs")
      .send(badBlog)
      .set({ authorization: token })
      .expect(400);

    expect(response.body.error).toBe(
      "Blog validation failed: url: URL is required, title: Blog title is required"
    );
  });
});

describe("testing the DELETE call", () => {
  test("sumbitting a delete request works", async () => {
    let blogs = await api.get("/api/blogs");

    await api
      .delete(`/api/blogs/${blogs.body[0].id}`)
      .set({ authorization: token })
      .expect(204);
  });

  test("after deleting the length on blogs is lower by 1", async () => {
    let blogs = await api.get("/api/blogs");
    let length = blogs.body.length;

    await api
      .delete(`/api/blogs/${blogs.body[0].id}`)
      .set({ authorization: token });
    blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(length - 1);
  });

  test("after deleting the note is missing from blogs", async () => {
    let blogs = await api.get("/api/blogs");
    let chosenBlog = blogs.body[0];

    await api
      .delete(`/api/blogs/${blogs.body[0].id}`)
      .set({ authorization: token });
    blogs = await api.get("/api/blogs");
    expect(blogs.body).not.toContainEqual(chosenBlog);
  });

  test("sumbitting a delete to a bad id returns an error", async () => {
    const response = await api
      .delete(`/api/blogs/6445e1150b5c1e38e25a7d3f`)
      .set({ authorization: token })
      .expect(400);

    expect(response.body.error).toBe("blog with this id does not exist");
  });
});

describe("testing PUT functionality", () => {
  test("can submit a put request", async () => {
    const blogs = await api.get("/api/blogs");
    let updatedBlog = {
      title: "My Recipe Book",
      author: "Makenzie Carr",
      url: "http",
      likes: 420,
    };
    await api
      .put(`/api/blogs/${blogs.body[0].id}`)
      .send(updatedBlog)
      .set({ authorization: token })
      .expect(200);
  });

  test("after submitting a put request the note is updated", async () => {
    let blogs = await api.get("/api/blogs");
    let updatedBlog = {
      title: "My Recipe Book",
      author: "Makenzie Carr",
      url: "http",
      likes: 420,
    };
    const response = await api
      .put(`/api/blogs/${blogs.body[0].id}`)
      .set({ authorization: token })
      .send(updatedBlog);

    response.body.id = undefined;
    response.body.user = undefined;
    expect(response.body).toEqual(updatedBlog);
    blogs = await api.get("/api/blogs");
    blogs.body[0].id = undefined;
    blogs.body[0].user = undefined;
    expect(blogs.body[0]).toEqual(updatedBlog);
  }, 10000);

  test("a put request with a bad id returns an error", async () => {
    let updatedBlog = {
      title: "My Recipe Book",
      author: "Makenzie Carr",
      url: "http",
      likes: 420,
    };
    await api
      .put(`/api/blogs/643dfb4174f3bd2d54333da`)
      .set({ authorization: token })
      .send(updatedBlog)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
