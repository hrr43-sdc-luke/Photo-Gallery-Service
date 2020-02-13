require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const port = process.env.PORT || 3003;

app.use(cors());

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.get('/:id', (req, res) => {
  res.render('../public/index.html');
});

app.get('/photos/:id', (req, res) => {
  const requestExpId = parseInt(req.params.id, 10);
  db.getPhotos(requestExpId, (err, exData) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(exData);
    }
  });
});


app.listen(port, () => console.log(`App listening on port ${port}`));
