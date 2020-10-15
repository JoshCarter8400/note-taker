const htmlRoutes = require("./routes/htmlRoutes");
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const router = require("express").Router();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("public"));

app.use("/", htmlRoutes);

// const { notes } = require("./Develop/db/db.json");

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
