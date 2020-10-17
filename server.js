const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("public"));
// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", function (error, notes) {
    if (error) {
      return console.log(error);
    }

    var parsedNotes = JSON.parse(notes);

    res.json(parsedNotes);
  });
});

app.post("/api/notes", (req, res) => {
  req.body.id = Date.now();
  fs.readFile("./db/db.json", "utf8", function (error, notes) {
    if (error) {
      return console.log(error);
    }

    var parsedNotes = JSON.parse(notes);
    parsedNotes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), function (error) {
      if (error) {
        return console.log(error);
      }
      res.json(req.body);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("./db/db.json", "utf8", function (error, notes) {
    if (error) {
      return console.log(error);
    }
    const filteredNotesArray = JSON.parse(notes).filter(
      (note) => note.id !== id
    );
    fs.writeFile("./db/db.json", JSON.stringify(filteredNotesArray), function (
      error
    ) {
      if (error) {
        return console.log(error);
      }
      res.json({ ok: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
