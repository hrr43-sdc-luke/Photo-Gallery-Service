/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
// ARROW CALLBACKS ARE DISCOURAGED BY MOCHA BECAUSE THEY MESS UP TESTING
// see https://mochajs.org/#arrow-functions
require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;

const db = require('../database/index.cassandra');

const numOfExperiences = 10000000;

const numOfTests = 20; // How many photos to retrieve, for instance

// this query is run outside of the test suite to set up the initial
// connection to the DB (since we are looking at query performance)
db.getExperiencePhotos(3)
  .then(() => {

    describe('Database', function () {
      after(db.client.shutdown.bind(db.client));

      describe('getExperiencePhotos retrieves random and beginning experience photos',
        function () {
          const expIds = Array.from({ length: numOfTests },
            () => Math.floor(Math.random() * numOfExperiences));

          expIds.push(Math.floor(Math.random() * 100));
          expIds.push(Math.floor(Math.random() * 100));
          expIds.push(Math.floor(Math.random() * 100));

          expIds.forEach(function (expId) {
            it(`retrieves photos from experience ${expId}`, function () {
              const getExperiencePhotos = db.getExperiencePhotos(expId);
              return Promise.all([
                expect(getExperiencePhotos).to.eventually.be.an('array'),
                expect(getExperiencePhotos).to.eventually.satisfy(function (results) {
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
        });

      describe('getExperiencePhotos retrieves photos near the end of the dataset',
        function () {
          const expIds = Array.from({ length: numOfTests },
            () => Math.floor(numOfExperiences - Math.random() * numOfExperiences * 0.1));

          expIds.forEach(function (expId) {
            it(`retrieves near-the-end-photo ${expId}`, function () {
              const getExperiencePhotos = db.getExperiencePhotos(expId);
              return Promise.all([
                expect(getExperiencePhotos).to.eventually.be.an('array'),
                expect(getExperiencePhotos).to.eventually.satisfy(function (results) {
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
        });
    });
    
    run();
  });
