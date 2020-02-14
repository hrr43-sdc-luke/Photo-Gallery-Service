require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  multipleStatements: true,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('==mySQL is connected==');
  }
});

const promiseQuery = (...rest) => new Promise((resolve, reject) => {
  // console.log('In promise');
  console.log('query: ', rest[0]);
  console.log('array: ', rest[1]);
  // resolve('Sorry, no data yet.');
  // return;
  db.query(...rest, (error, response) => {
    if (error) {
      reject(error);
    } else {
      // console.log('response ', response);
      resolve(response);
    }
  });
});

const getExperiencePhotos = (expId, callback) => {
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

const deleteExperiencePhotos = (expId, callback) => {
  // First get the records that will be deleted so we can return them
  getExperiencePhotos(expId, (err, deletedRecords) => {
    db.query('DELETE FROM photos WHERE photoId <> -1 AND experienceId=?', expId, (error) => {
      if (error) {
        console.log('ERROR: ', error);
        callback(error);
      } else {
        callback(null, deletedRecords);
      }
    });
  });
};

const postExperiencePhotos = (expIdDangerous, array, callback) => {
  const expId = parseInt(expIdDangerous); // ensure it's a number before using it to write to the DB

  db.query(`DELETE FROM photos WHERE photoId <> -1 AND experienceId=${expId};`
    + `${array.map(() => ''
      + ' INSERT INTO photos (photoUrl, alt, username, experienceId)'
      + ` VALUES (?, ?, ?, ${expId});`).join('')}`,
  array.reduce((a, o) => { a.push(o.photoUrl); a.push(o.alt); a.push(o.username); return a; }, []),
  (error) => {
    if (error) {
      callback(error);
    } else {
      getExperiencePhotos(expId, (err, response) => callback(null, response));
    }
  });
};

const putExperiencePhotos = async (expIdDangerous, array, callback) => {
  // This function is for updating an expId. There are two kinds of updates allowed.
  // Firstly, given a photoObj with a photoId, it updates that record with expIdDangerous
  // as well as any other values on the photoObj. Note that whatever expId is passed in
  // as part of photoObj is ignored and replaced with expIdDangerous.
  // Secondly, given a photoObj without a photoId, it's just added. Like above, it is
  // added with expIdDangerous and any expId on the photoObj is ignored.

  // Because there can be many photoObj's in the array, each DB call is done with a
  // promise and placed in an array and resolved with Promise.all. In other functions
  // in this file I was able to build a single SQL query so the need for promises was
  // not as great. In retrospect, perhaps the queries in this function could also
  // have been done in that way.

  const expId = parseInt(expIdDangerous); // ensure it's a number before using it to write to the DB

  const dbActions = [];

  array.forEach((photoObj) => {
    let query;
    const args = [];

    if (parseInt(photoObj.photoId) > 0) {
      // This is an update of an existing record

      // Build a query like UPDATE photos SET username='foo' WHERE photoId=2

      query = 'UPDATE photos SET';
      let firstEntry = true;
      Object.entries(photoObj).forEach((a) => {
        const [key, value] = a;
        if (key !== 'photoId' && key !== 'experienceId') {
          if (!firstEntry) query += ',';
          query += ` ${key}=?`;
          args.push(value);
          firstEntry = false;
        }
      });
      if (!firstEntry) query += ',';
      query += ` experienceId=${expId}`;
      query += ' WHERE photoId=?;';
      args.push(photoObj.photoId);
    } else {
      // This is a new record

      // Build a query like INSERT INTO photos (photoUrl, alt, username,
      // experienceId) VALUES (http..., 'foo', 'bar', 3);

      let queryEnd = ' VALUES (';
      query = 'INSERT INTO photos (';
      let firstEntry = true;
      Object.entries(photoObj).forEach((a) => {
        const [key, value] = a;
        if (key !== 'photoId' && key !== 'experienceId') {
          if (!firstEntry) {
            query += ',';
            queryEnd += ',';
          }
          query += ` ${key}`;
          args.push(value);
          queryEnd += ' ?';
          firstEntry = false;
        }
      });
      if (!firstEntry) {
        query += ',';
        queryEnd += ',';
      }
      query += ' experienceId)';
      args.push(expId);
      queryEnd += ' ?);';
      query += queryEnd;
    }
    dbActions.push(promiseQuery(query, args));
  });
  Promise.all(dbActions)
    .then(() => {
      getExperiencePhotos(expId, (err, response) => callback(null, response));
    });
};

module.exports = {
  db, getExperiencePhotos, postExperiencePhotos, putExperiencePhotos, deleteExperiencePhotos,
};
