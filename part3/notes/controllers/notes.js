const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    console.log(id);
    let res = await Note.findByIdAndRemove(id);
    console.log(res);
    response(204).end();
  } catch (err) {
    next(err);
  }
});

notesRouter.put("/:id", async (request, response, next) => {
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

module.exports = notesRouter;
