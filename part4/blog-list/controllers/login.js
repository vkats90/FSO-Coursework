const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCheck =
    user == null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCheck)) {
    return res
      .status(401)
      .json({ error: "username and/or password are incorrect" });
  }

  const tokenUser = {
    username: user.username,
    id: user._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(tokenUser, process.env.SECRET, { expiresIn: 60 * 60 });

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
