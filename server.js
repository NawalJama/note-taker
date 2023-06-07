const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.post("/api/notes", function (req, res) {
    let notesInDbJson = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let reqNote = req.body;
    let newID = notesInDbJson.length.toString();
    reqNote.id = newID;
    notesInDbJson.push(reqNote);
  
    fs.writeFileSync("./db/db.json", JSON.stringify(notesInDbJson));
    res.json(notesInDbJson);
  });  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);