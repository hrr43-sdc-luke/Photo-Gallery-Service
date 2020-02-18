require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const port = process.env.PORT || 3000;

app.use(cors()); // this enables ALL cors requests

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.engine('html', require('ejs').renderFile);  // Not sure ejs is used anywhere

// This route returns all the photos assocciated with an experience
app.get('/api/exp-photos/:expId', (req, res) => {
  db.getExperiencePhotos(parseInt(req.params.expId, 10))
    .then((expPhotos) => {
      res.status(200).send(expPhotos);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// The remainder of the routes work on individual photos

app.use('/api/photo/:photoId', (req, res) => {
  const photoId = parseInt(req.params.photoId, 10);
  let action;

  // POST is for a new photo (i.e. without a photo ID, or ignore if there is one)
  // PUT is for updating a photo with an already existing ID OR, if nothing
  // exists at the photoId, servers are allowed to create it, which we will do
  // as it helps with testing (you can put back records you delete)
  if (req.method === 'GET') {
    action = db.getPhoto;
  } else if (req.method === 'PUT') {
    action = db.updatePhoto;
  } else if (req.method === 'DELETE') {
    action = db.deletePhoto;
  } else {
    res.status(400).end();
    return;
  }
  action(photoId, req.body)
    .then((photo) => {
      if (photo) return res.status(200).send(photo);
      return res.status(204).end();
    })
    .catch((err) => res.status(400).send(err));
});

app.post('/api/photo', (req, res) => {
  db.insertPhoto(req.body)
    .then((photo) => res.status(200).send(photo))
    .catch((err) => res.status(400).send(err));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
