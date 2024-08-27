const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const fs = require('fs');

let db = [];

function readNotesFromFile(callback) {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        db = JSON.parse(data);
        if (callback) {
            callback(db);
        }
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

app.get('/api/notes', (req, res) =>
    res.json(db)
);

app.post('/api/notes', (req, res) => {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    // Find the highest ID
    let highestId = 0;
    for (const note of db) {
        if (note.id > highestId) {
            highestId = note.id;
        }
    }
    // This assigns an ID to the newNote. 
    newNote.id = highestId + 1;
    // We push it to db.json.
    db.push(newNote)

    fs.writeFile(jsonFilePath, JSON.stringify(db), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Your note was saved!');
        res.json(newNote);
    });
});

readNotesFromFile();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
