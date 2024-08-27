

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const db = require("./db/db")
const fs = require('fs')


function readNotesFromFile(callback) {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
       const database = JSON.parse(data);
       callback(database)
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
        readNotesFromFile((data) => {
            res.json(data);
        });
    })


    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        // This allows the test note to be the original note.
        let highestId = 0;
        // This loops through the array and finds the highest ID.
        for (let i = 0; i < db.length; i++) {
            let individualNote = db[i];

            if (individualNote.id > highestId) {
                // highestId will always be the highest numbered id in the notesArray.
                highestId = individualNote.id;
            }
        }
        // This assigns an ID to the newNote. 
        newNote.id = highestId + 1;
        // We push it to db.json.
        db.push(newNote)

        // Write the db.json file again.
        fs.writeFile(jsonFilePath, JSON.stringify(db), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        // Gives back the response, which is the user's new note. 
        res.json(newNote);
    });



readNotesFromFile((data) => {
    app.listen(PORT, () => {
        console.log(`Please check http://localhost:${PORT}`);
    });
});

