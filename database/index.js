require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('==mySQL is connected==');
  }
});

const getPhotos = (expId, callback) => {
  const grabAll = 'SELECT * FROM photos WHERE experienceId = ?';
  db.query(grabAll, expId, (error, response) => {
    if (error) {
      console.log('ERROR: ', error);
      callback(error);
    } else {
      callback(null, response);
    }
  });
};


module.exports = {
  db, getPhotos,
};
