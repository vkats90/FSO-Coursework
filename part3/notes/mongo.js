const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

console.log(process.argv);

const password = process.argv[2];

const url = `mongodb+srv://mars77:${password}@cluster0.xbzwd5f.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "But Javascript isn't",
  important: true,
});

/*
note.save().then((result) => {
  console.log("note saved!");
  console.log(result);
  mongoose.connection.close();
}); */

/* Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
}); */
