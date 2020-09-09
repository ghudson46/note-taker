// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4001;


// note array
let noteArray = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));
console.log(noteArray);

// sets up the express application to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// notes.html route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// returns db.json 
app.get("/api/notes", function(req, res) {
    try {
      res.end(JSON.stringify(noteArray));
    } catch (err) {
      console.log(err);
      res.end(err);
    }    
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  noteArray.splice(noteId, 1);

  console.log(noteArray);

  fs.writeFileSync(path.resolve(`${__dirname}/db/db.json`), JSON.stringify(noteArray));

  res.status(200).json(noteArray);
  console.log(`note deleted successfully`);
  
});

app.post('/api/notes', (req, res) => {
  // adds new note to db.json
  let newNote = req.body;

  noteArray.push(newNote);

  fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(noteArray), err => {
    if (err) {
      throw err;
    } else {
      res.json(noteArray); 
    }
  })

  console.log(noteArray);
});

// index.html route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// goes to index.html if no route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// express application is listening to run on local host 4001
app.listen(PORT, () => {
  console.log(`app is listening on local host: ${PORT}`);
});