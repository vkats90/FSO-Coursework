const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  let user = new User({
    username: "placeholder",
    name: "bot",
    password: "password1",
  });

  await user.save();
});

describe("testing the POST functionality", () => {
  test("make sure a proper note can be submitted", async () => {
    let user = {
      username: "testUser",
      name: "vlad",
      password: "password",
    };
    const response = await api.post("/api/users").send(user).expect(201);

    expect(response.body.username).toBe(user.username);
    expect(response.body.password).not.toBe(user.password);
  });
  test("make sure that you can't submit a username that is not unique", async () => {
    let user = {
      username: "placeholder",
      name: "bot",
      password: "password1",
    };
    const response = await api.post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "User validation failed: username: Error, expected `username` to be unique. Value: `placeholder`"
    );
  });
  test("make sure that you can submit a user with a missing password", async () => {
    let user = {
      username: "testUser",
      name: "bot",
    };
    const response = await api.post("/api/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("username and password are required");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
