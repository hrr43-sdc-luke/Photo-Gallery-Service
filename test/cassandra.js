/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
require('dotenv').config();
require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const cassandra = require('cassandra-driver');

// Mocha setup
chai.use(chaiAsPromised);
const { expect } = chai;

// Cassandra setup
const cass = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'photo',
});

const numOfExperiences = 10000000;
const numOfTests = 20; // How many photos to retrieve, for instance

// make an initial query to wake up the DB
cass.execute(
  'SELECT * FROM photo.photos WHERE "experience_id"=?', [33], { prepare: true },
)
  .then(() => {
    describe('Database', function () {
      after(function () {
        return cass.shutdown();
      });

      const expIds = Array.from({ length: numOfTests },
        () => Math.floor(Math.random() * numOfExperiences));

      expIds.forEach(function (expId) {
        it(`Cassandra retrieves photos from experience ${expId}`, function () {
          const dbPromise = cass.execute('SELECT * FROM photo.photos WHERE "experience_id"=?', [expId], { prepare: true });
          return Promise.all([
            expect(dbPromise).to.eventually.satisfy(function (results) {
              if (results.length) {
                return results[0].username
                  && results[0].photo_url
                  && results[0].experience_id === expId;
              }
              return true;
            }),
          ]);
        });
      });

      expIds.forEach(function (expId) {
        it('Cassandra deletes photos', function () {
          let rowLength;
          return cass.execute('SELECT * FROM photo.photos WHERE "experience_id"=?', [expId], { prepare: true })
            .then((results) => {
              const row = Math.floor(Math.random() * results.rows.length);
              rowLength = results.rowLength;
              return cass.execute('DELETE FROM photos WHERE experience_id=? AND photo_url=? AND username=?', [
                results.rows[row].experience_id,
                results.rows[row].photo_url,
                results.rows[row].username,
              ], { prepare: true })
            })
            .then(() => cass.execute('SELECT * FROM photo.photos WHERE "experience_id"=?', [expId], { prepare: true }))
            .then((results) => {
              // Check that we have one less row for this expId (since we deleted one row)
              return expect(rowLength - 1).to.equal(results.rowLength);
            });
        });
      });

      expIds.forEach(function (expId) {
        it(`Cassandra updates records`, function () {
          const newAlt = 'ALT TAG REMOVED BY TEST SUITE';
          let oldAlt;
          let row;
          return cass.execute('SELECT * FROM photo.photos WHERE "experience_id"=?', [expId], { prepare: true })
            .then((results) => {
              row = Math.floor(Math.random() * results.rows.length);
              oldAlt = results.rows[row].alt;
              return cass.execute('UPDATE photo.photos SET alt=? WHERE experience_id=? AND photo_url=? AND username=?', [
                newAlt,
                results.rows[row].experience_id,
                results.rows[row].photo_url,
                results.rows[row].username,
              ], { prepare: true })
            })
            .then(() => cass.execute('SELECT * FROM photo.photos WHERE "experience_id"=?', [expId], { prepare: true }))
            .then((results) => {
              expect(results.rows[row].alt).to.equal(newAlt);
              return cass.execute('UPDATE photo.photos SET alt=? WHERE experience_id=? AND photo_url=? AND username=?', [
                oldAlt,
                results.rows[row].experience_id,
                results.rows[row].photo_url,
                results.rows[row].username,
              ], { prepare: true })
            })
        });
      });

      expIds.forEach(function (expId) {
        it(`Cassandra inserts records`, function () {
          const newStuff = {
            alt: 'ALT INSTERTED BY TEST SUITE',
            photo_url: 'HTTP INSERTED BY TEST SUITE',
            username: 'USERNAME INSERTED BY TEST SUITE',
          }
          return cass.execute('SELECT * FROM photo.photos WHERE "experience_id"=?', [expId], { prepare: true })
            .then((results) => cass.execute('INSERT INTO photo.photos (alt, experience_id, photo_url, username) VALUES (?, ?, ?, ?)', [
              newStuff.alt,
              expId,
              newStuff.photo_url,
              newStuff.username,
            ], { prepare: true }))
            .then(() => cass.execute('SELECT * FROM photo.photos WHERE "experience_id"=? AND photo_url=? AND username=?', [
              expId, newStuff.photo_url, newStuff.username], { prepare: true }))
            .then((results) => {
              expect(results.rows[0].username).to.equal(newStuff.username);
              return cass.execute('DELETE FROM photos WHERE experience_id=? AND photo_url=? AND username=?', [
                expId,
                newStuff.photo_url,
                newStuff.username,
              ], { prepare: true })
            })
        });
      });
    });

    run();
  });
