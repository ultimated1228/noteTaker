const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

// Read notes from db.json
router.get('/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Create a new note
router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

module.exports = router;
