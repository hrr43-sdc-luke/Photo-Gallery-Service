// NOT WORKING!
// This project has a "dataGen.js" file that makes a CSV with lots of entries
// for importing into databases. That CSV can be successfully imported into
// both PostgreSQL and Cassandra. However, I wanted to try an alternate schema
// with Cassandra (putting the photos into sets) so I wrote this program
// to read the CSV and insert the data into the alternate Cassandra table.
//
// The code below works for small numbers of records. It fails for large numbers
// due to running out of DB resources.
//
// I did not troubleshoot that issue further because the performance is very slow.
// If development continues on this file, speed may be the first thing to look at.

/* eslint-disable wrap-iife */
const cassandra = require('cassandra-driver');
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'photo',
});

const query = 'INSERT INTO photo.photos2 (experience_id, photo) VALUES (?, ?)';

let photos = [];

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: createReadStream('./data.csv'),
      crlfDelay: Infinity,
    });

    let e = 0;
    rl.on('line', (line) => {
      const [url, alt, username, expid] = line.split(',');
      if (e !== expid) {
        client.execute(query, [e, photos], { prepare: true }, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            // console.log('result from query', result);
          }
        });
        e = expid;
        photos = [];
      }
      photos.push({ photo_url: url, alt, username });
    });

    await once(rl, 'close');

    console.log('File processed.');

    client.execute(query, [e, photos], { prepare: true }, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log('result from query', result);
        client.shutdown();
      }
    });
  } catch (err) {
    console.error(err);
  }
})();
