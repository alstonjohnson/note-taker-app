
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});


app.post('/api/notes', (req, res) => {
    const db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    const userNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };

    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

});
