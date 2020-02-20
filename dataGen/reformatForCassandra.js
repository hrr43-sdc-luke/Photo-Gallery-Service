// NOT WORKING!
// This program reformats the original CSV into a format for an alternative
// table format in Cassandra.
//
// It is currently too slow to be useful.

const { once } = require('events');
const { createReadStream, writeFileSync } = require('fs');
const { createInterface } = require('readline');

writeFileSync('./tailCassandra.csv', '');

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: createReadStream('./tail.csv'),
      crlfDelay: Infinity,
    });

    let e = 0;
    let firstLine = true;
    rl.on('line', (line) => {
      const [url, alt, username, expid] = line.split(',');
      if (e !== expid) {
        e = expid;
        if (!firstLine) writeFileSync('./tailCassandra.csv', '}"\n', { flag: 'a' });
        firstLine = false;
        writeFileSync('./tailCassandra.csv', `${expid},"{`, { flag: 'a' });
      } else {
        writeFileSync('./tailCassandra.csv', ',', { flag: 'a' });
      }
      writeFileSync('./tailCassandra.csv', `{photo_url: '${url}', alt: '${alt}', username: '${username}'}`, { flag: 'a' });
    });

    await once(rl, 'close');
    writeFileSync('./tailCassandra.csv', '}"\n', { flag: 'a' });

    console.log('File processed.');
  } catch (err) {
    console.error(err);
  }
}());
