
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();



app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );
  
  // GET Route for feedback page
  app.get('/feedback', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
  );

app.listen(PORT, () => {
    console.log(`Please check localhost${PORT}`);
  });