require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


const db = {
  getExperiencePhotos: (expId) => pool
    .connect()
    .then((client) => client
      .query('SELECT * FROM photos WHERE "experienceId" = $1', [expId])
      .then((res) => {
        client.release();
        return res.rows;
      })
      .catch((err) => {
        client.release();
        return err;
      })),

  getPhoto: (photoId) => pool
    .connect()
    .then((client) => client
      .query('SELECT * FROM photos WHERE "photoId" = $1', [photoId])
      .then((res) => {
        client.release();
        return res.rows;
      })
      .catch((err) => {
        client.release();
        return err;
      })),

  updatePhoto: (photoId, photo) => pool
    .connect()
    .then((client) => {
      const localPhoto = photo;
      if (localPhoto.photoId) delete localPhoto.photoId;

      const values = Object.values(localPhoto);
      values.push(photoId);

      return client
        .query(`UPDATE photos SET (${Object.keys(localPhoto).map((k) => `"${k}"`)}) =
          (${Object.keys(localPhoto).map((e, i) => `$${i + 1}`)}) WHERE
          "photoId"=$${Object.keys(localPhoto).length + 1}`, values)
        .then((res) => {
          if (res.rowCount === 1) {
            client.release();
            localPhoto.photoId = photoId;
            return localPhoto;
          }
          return client
            .query(`INSERT INTO photos ("photoId", "photoUrl", alt, username, "experienceId")
          VALUES ($1, $2, $3, $4, $5)`, [photoId, photo.photoUrl, photo.alt, photo.username, photo.experienceId])
            .then(() => {
              client.release();
              localPhoto.photoId = photoId;
              return localPhoto;
            });
        })
        .catch((err) => {
          client.release();
          return err;
        });
    }),

  deletePhoto: (photoId) => pool
    .connect()
    .then((client) => client
      .query('DELETE FROM photos WHERE "photoId" = $1 RETURNING *', [photoId])
      .then((res) => {
        client.release();
        if (res.rowCount === 1) return res.rows[0];
        return null;
      })
      .catch((err) => {
        client.release();
        return err;
      })),

  insertPhoto: ({ photoUrl, alt, username, experienceId }) =>
    pool
      .connect()
      .then((client) => client
        .query(`INSERT INTO photos ("photoUrl", alt, username, "experienceId")
       VALUES ($1, $2, $3, $4) RETURNING "photoId"`, [photoUrl, alt, username, experienceId])
        .then((res) => {
          client.release();
          return { photoId: res.rows[0].photoId, photoUrl, alt, username, experienceId };
        })
        .catch((err) => {
          client.release();
          return err;
        })),
};

module.exports = db;
