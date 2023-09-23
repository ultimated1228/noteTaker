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

// ADDITIONAL CHALLENGE DELETE A NOTE BY ID
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);

        // Find the index of the note with the specified ID
        const noteIndex = notes.findIndex((note) => note.id === noteId);

        if (noteIndex !== -1) {
            // Remove the note from the array
            notes.splice(noteIndex, 1);

            // Put the new notes array back 
            fs.writeFile('db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                res.json({ message: 'Note deleted' });
            });
        } else {
            res.status(404).json({ message: 'Note with this ID not found' });
        }
    });
});

module.exports = router;
