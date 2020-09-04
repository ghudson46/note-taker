// requiring the packages needed to run server
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3060;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/api/notes', (req, res) => {
  // Should read the `db.json` file and return all saved notes as JSON.
});

app.post('/api/notes', (req, res) => {
  // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
});



// set up port the app is listening on
app.listen(PORT, () => {
  console.log('App is listening on local host: ' + PORT);
});