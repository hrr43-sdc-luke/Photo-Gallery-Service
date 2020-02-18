/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// ARROW CALLBACKS ARE DISCOURAGED BY MOCHA BECAUSE THEY MESS UP TESTING
// see https://mochajs.org/#arrow-functions
require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;

const db = require('../database');

const numOfTests = 20; // How many photos to retrieve, for instance

let minPhotoId;
let maxPhotoId;

// Because we want to have these values to construct tests, mocha
// must be run with "--delay" and the the call to "run()" below
// allows mocha to proceed
db.pool.query('SELECT min("photoId"), max("photoId") FROM photos;')
  .then((minMaxResults) => {
    minPhotoId = minMaxResults.rows[0].min;
    maxPhotoId = minMaxResults.rows[0].max;

    describe('Database', function () {
      after(db.end);

      describe('getPhoto retrieves random and beginning photos',
        function () {
          const photoIds = Array.from({ length: numOfTests },
            () => Math.floor(Math.random() * (maxPhotoId - minPhotoId)
              + minPhotoId));

          photoIds.push(minPhotoId + Math.floor(Math.random() * 100));
          photoIds.push(minPhotoId + Math.floor(Math.random() * 100));
          photoIds.push(minPhotoId + Math.floor(Math.random() * 100));

          photoIds.forEach(function (photoId) {
            it(`retrieves photo ${photoId}`, function () {
              const getPhoto = db.getPhoto(photoId);
              return Promise.all([
                expect(getPhoto).to.eventually.be.an('object'),
                expect(getPhoto).to.eventually.satisfy(function (results) {
                  if (results.length) {
                    return results.length === 1
                      && results.photoId === photoId
                      && results.username
                      && results.photoUrl
                      && typeof results.experienceId === 'number'
                      && results.experienceId > 0;
                  }
                  return true;
                }),
              ]);
            });
          });
        });

      describe('getPhoto retrieves photos near the end of the dataset',
        function () {
          const photoIds = Array.from({ length: numOfTests },
            () => Math.floor(maxPhotoId - Math.random() * maxPhotoId * 0.1));

          photoIds.forEach(function (photoId) {
            it(`retrieves near-the-end-photo ${photoId}`, function () {
              const getPhoto = db.getPhoto(photoId);
              return Promise.all([
                expect(getPhoto).to.eventually.be.an('object'),
                expect(getPhoto).to.eventually.satisfy(function (results) {
                  if (results.length) {
                    return results.length === 1
                      && results.photoId === photoId
                      && results.username
                      && results.photoUrl
                      && typeof results.experienceId === 'number'
                      && results.experienceId > 0;
                  }
                  return true;
                }),
              ]);
            });
          });
        });

      // Because we are running mocha with "--delay" to allow the async DB call
      // to find min and max to complete, we have to tell mocha it can start
      run();
    });
  });