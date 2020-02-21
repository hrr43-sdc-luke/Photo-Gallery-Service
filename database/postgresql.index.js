require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


const db = {
  getExperiencePhotos: (expId) => pool
    .query('SELECT * FROM photos WHERE "experienceId" = $1', [expId])
    .then((res) => res.rows)
    .catch((err) => err),

  getPhoto: (photoId) => pool
    .query('SELECT * FROM photos WHERE "photoId" = $1', [photoId])
    .then((res) => res.rows[0])
    .catch((err) => err),

  updatePhoto: (photoId, photo) => {
    const localPhoto = photo;
    if (localPhoto.photoId) delete localPhoto.photoId;

    const values = Object.values(localPhoto);
    values.push(photoId);

    return pool
      .query(`UPDATE photos SET (${Object.keys(localPhoto).map((k) => `"${k}"`)}) =
          (${Object.keys(localPhoto).map((e, i) => `$${i + 1}`)}) WHERE
          "photoId"=$${Object.keys(localPhoto).length + 1}`, values)
      .then((res) => {
        if (res.rowCount === 1) {
          localPhoto.photoId = photoId;
          return localPhoto;
        }
        return pool
          .query(`INSERT INTO photos ("photoId", "photoUrl", alt, username, "experienceId")
          VALUES ($1, $2, $3, $4, $5)`, [photoId, photo.photoUrl, photo.alt, photo.username, photo.experienceId])
          .then(() => {
            localPhoto.photoId = photoId;
            return localPhoto;
          });
      })
      .catch((err) => err);
  },

  deletePhoto: (photoId) => pool
    .query('DELETE FROM photos WHERE "photoId" = $1 RETURNING *', [photoId])
    .then((res) => {
      if (res.rowCount === 1) return res.rows[0];
      return null;
    })
    .catch((err) => err),

  insertPhoto: ({
    photoUrl, alt, username, experienceId,
  }) => pool
    .query(`INSERT INTO photos ("photoUrl", alt, username, "experienceId")
       VALUES ($1, $2, $3, $4) RETURNING "photoId"`, [photoUrl, alt, username, experienceId])
    .then((res) => ({
      photoId: res.rows[0].photoId, photoUrl, alt, username, experienceId,
    }))
    .catch((err) => err),

  end: () => pool.end(),
  pool,
};

module.exports = db;
