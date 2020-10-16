const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var newNote = require("./db/db.json");
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
  res.json(newNote);
});

app.post("/api/notes", (req, res) => {
  req.body.id;
  newNote.push(req.body);
  res.json(newNote);
});
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
