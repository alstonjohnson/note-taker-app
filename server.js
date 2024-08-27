

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const database = require("./db/db")
const fs = require('fs')


function readNotesFromFile() {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        db = JSON.parse(data);
    });
}

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );
  
  app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
  );


  app.route("/api/notes")
  .get(function (req, res) {
      res.json(database);
  })


  .post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    // This allows the test note to be the original note.
    let highestId = 99;
    // This loops through the array and finds the highest ID.
    for (let i = 0; i < database.length; i++) {
        let individualNote = database[i];

        if (individualNote.id > highestId) {
            // highestId will always be the highest numbered id in the notesArray.
            highestId = individualNote.id;
        }
    }
    // This assigns an ID to the newNote. 
    newNote.id = highestId + 1;
    // We push it to db.json.
    database.push(newNote)

    // Write the db.json file again.
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Your note was saved!");
    });
    // Gives back the response, which is the user's new note. 
    res.json(newNote);
});





readNotesFromFile();







app.listen(PORT, () => {
    console.log(`Please check http://localhost:${PORT}`);
  });


  