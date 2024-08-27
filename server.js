

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const database = require("./db/db")



app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );
  
  app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
  );

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
  );


  app.route("/api/notes")
  .get(function (req, res) {
      res.json(database);
  })















app.listen(PORT, () => {
    console.log(`Please check http://localhost:${PORT}`);
  });


  