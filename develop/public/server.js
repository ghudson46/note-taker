// requiring the packages needed to run server
const express = require('express');
const path = require('path');
const fs = require('fs');
const localJson = require('./db.json');
const { notDeepStrictEqual } = require('assert');


const app = express();
const PORT = 3060;


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// static middleware
app.use(express.static("../public"));

// creates body for json data
var notes = [
  {
  "title":"Test Title",
  "text":"Test text"
  }
];

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// API Routes

app.get('/api/notes', (req, res) => {
  res.json(localJson);
  // Should read the `db.json` file and return all saved notes as JSON.
});

app.post('/api/notes', (req, res) => {
  notes.push(req.body);
  res.json(true);
  // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
});

fs.appendFile("../db.json", JSON.stringify(notes), (err) => {
  if (err) {
    console.log(err);
  }
});

app.delete('/api/notes/:id', (req, res) => {
  // Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
});



// set up port the app is listening on
app.listen(PORT, () => {
  console.log('App is listening on local host: ' + PORT);
});