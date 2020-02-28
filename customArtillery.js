'use strict';

module.exports = {
  doStuff
};

const maxExpId = 10000000;

function doStuff(userContext, events, done) {
  userContext.vars.expId = Math.floor(Math.random() * maxExpId);
  return done();
}