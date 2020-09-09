const express = require('express');
// dependencies
const app = express();
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const PORT = process.env.PORT || 4001;

// note array
let noteArray = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));
console.log(noteArray);

// sets up the express application to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// returns db.json 
app.get("/api/notes", function(req, res) {
  try {
      res.end(JSON.stringify(noteArray));
  } catch (err) {
      console.log(err);
      res.end(err);
  }    
});


// notes.html route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// index.html route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// goes to index.html if no route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});





app.listen(PORT, () => {
  console.log(`app is listening on local host: ${PORT}`);
});