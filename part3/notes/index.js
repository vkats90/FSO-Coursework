require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const Note = require("./modules/note");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(requestLogger);

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((res) => {
      if (res) {
        response.json(res);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", async (request, response) => {
  const id = request.params.id;
  try {
    console.log(id);
    let res = await Note.findByIdAndRemove(id);
    console.log(res);
    response(204).end();
  } catch (err) {
    next(err);
  }

  response.status(204).end();
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((res) => {
      response.json(res);
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", async (request, response, next) => {
  let id = request.params.id;
  const { content, important } = request.body;
  try {
    let note = await Note.findByIdAndUpdate(
      id,
      { content, important },
      { new: true, runValidators: true, context: "query" }
    );
    response.json(note);
  } catch (err) {
    next(err);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
