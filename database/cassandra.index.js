const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'photo',
});

const photoTable = 'photos';

// Bogus query to open a connection to the DB
client.execute('NOTHING').catch(() => { });

const db = {
  client,

  getExperiencePhotos: (expId) => client
    .execute(`SELECT * FROM ${photoTable} WHERE "experience_id"=?`, [expId], { prepare: true })
    .then((res) => res.rows.map((photo) => ({
      experienceId: photo.experience_id,
      photoUrl: photo.photo_url,
      username: photo.username,
      alt: photo.alt,
    })))
    .catch((err) => err),

  // In the SQL world, making an API to get one photo based on photoId seems
  // like a pretty standard thing. However, it's not clear there is a use case for this
  // api in the current system. Further, in thinking about this API in the context
  // of a NoSQL database where there is no serialized photoId and the key is currently
  // (experienceId, username, photoUrl), you already have the "photo" information
  // (unless you somehow managed to lose the alt text.) So there's nothing to retrieve
  // from the DB.
  // getPhoto: () => {}

  // The only thing updatable about a photo is the alt text. (experience id, username,
  // and photo url are part of the primary key and are not updatable. You would have
  // to delete an unwanted photo and insert a new one.)
  updatePhoto: (photo, newAlt) => client
    .execute(`UPDATE ${photoTable} SET alt=? WHERE experience_id=? AND photo_url=? AND username=?`, [
      newAlt,
      photo.experienceId,
      photo.photoUrl,
      photo.username,
    ], { prepare: true })
    .then(() => 'OK (but unconfirmed)')
    .catch((err) => err),

  deletePhoto: (photo) => client
    .execute(`DELETE FROM ${photoTable} WHERE experience_id=? AND photo_url=? AND username=?`, [
      photo.experienceId,
      photo.photoUrl,
      photo.username,
    ], { prepare: true })
    .then(() => 'OK (but unconfirmed)')
    .catch((err) => err),

  insertPhoto: (photo) => client
    .execute(`INSERT INTO ${photoTable} (alt, experience_id, photo_url, username) VALUES (?, ?, ?, ?)`, [
      photo.alt,
      photo.experienceId,
      photo.photoUrl,
      photo.username,
    ], { prepare: true })
    .then(() => 'OK (but unconfirmed)')
    .catch((err) => err),
};

module.exports = db;
