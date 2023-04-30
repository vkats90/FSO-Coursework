const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

/* included in userExtract
const getToken = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("bearer ")) {
    req.token = auth.replace("bearer ", "");
  }

  next();
};
*/

const userExtract = async (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("bearer ")) {
    req.token = auth.replace("bearer ", "");
  }

  try {
    const checkToken = jwt.verify(req.token, process.env.SECRET);
    req.user = await User.findById(checkToken.id);
  } catch (error) {
    next(error);
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

module.exports = {
  userExtract,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
