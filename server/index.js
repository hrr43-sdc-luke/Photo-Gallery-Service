require('newrelic');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const db = require('../database/cassandra.index');

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

// The remainder of the routes work on individual photos (what little can be
// done with them).
//
// Users of these routes must provide a photo in the request body (with
// experienceId, username, and photoUrl.)
app.all('/api/photo', (req, res) => {
  let action;

  if (req.method === 'POST') {
    action = db.insertPhoto;
  } else if (req.method === 'PUT') {
    action = db.updatePhoto;
  } else if (req.method === 'DELETE') {
    action = db.deletePhoto;
  } else {
    res.status(400).end();
    return;
  }

  if (!req.body.alt) req.body.alt = '';
  action(req.body, req.body.alt)
    .then(() => res.status(200).end())
    .catch((err) => (res.status(400).send(err)));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
