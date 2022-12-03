const myNotes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving notes
myNotes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for a specific Note
myNotes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/tips.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes. Exclude selected one
      const result = json.filter((note) => note.id !== noteId);

      // Save the array
      writeToFile("./db/tips.json", result);

      // Respond to the DELETE request
      res.json(`${noteId} has been deleted`);
    });
});

// POST Route for new note
myNotes.post("/", (req, res) => {
  console.log(req.body);

  const { text, title } = req.body;

  if (text && title) {
    const createNote = {
      title,
      text,
      id,
    };

    readAndAppend(createNote, "./db/db.json");
    res.json(`Successfully added note`);
  } else {
    res.error("This did not work.");
  }
});

module.exports = myNotes;
