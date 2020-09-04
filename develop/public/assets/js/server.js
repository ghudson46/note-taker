const express = require('express');
const app = express();
const port = 3060;


app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/notes', (req, res) => {
  res.sendFile('notes.html');
});

app.listen(port, () => {
  console.log('App is listening on local host: ' + port);
});