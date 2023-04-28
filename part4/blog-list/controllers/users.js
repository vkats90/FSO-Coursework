const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    content: 1,
    important: 1,
  });
  res.json(users);
});

userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "username and password are required" });
  else if (username.length < 3 || password.length < 3)
    return res.status(400).json({
      error: "username and password need to be at least 3 characters long ",
    });
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  let newUser = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
