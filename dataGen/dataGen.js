const fs = require('fs');
const faker = require('faker');

const filename = './data2.csv';
const startExperience = 1;
const numOfExperiences = 10000000;
const numOfPhotos = 25;

const URLstart = 'http://43sdcp.s3-us-west-2.amazonaws.com/images/';

const topics = fs.readFileSync('./topics.txt', 'utf8').split(/\r*\n/);

// Normally, startExperience would be 1, and we'll make a new file. However, if the process
// doesn't finish and you want to just start where you left off, change startExperience
if (startExperience <= 1) fs.writeFileSync(filename);

let recordsString = '';

for (let i = startExperience; i <= numOfExperiences; i += 1) {
  const topicNum = Math.floor(Math.random() * topics.length);

  for (let photoNum = 1; photoNum <= Math.ceil(Math.random() * 9) + 9; photoNum += 1) {
    // eslint-disable-next-line prefer-template
    recordsString += URLstart
      + `${topics[topicNum]}-${Math.ceil(Math.random() * numOfPhotos)}.jpg,`
      + `${faker.lorem.sentence()},${faker.internet.userName()},${i}\n`;
  }

  if (i % 100000 === 0) {
    const writeStart = process.uptime();
    fs.writeFileSync(filename, recordsString, { flag: 'a' });
    recordsString = '';
    // global.gc();  // force JS to garbage collect to prevent running out of memory
    console.log(' GC: ', i, '; write/GC time: ', process.uptime() - writeStart,
      '; overall time: ', process.uptime());
  }
}

// Write out anything left in recordsString
if (recordsString !== '') {
  fs.writeFileSync(filename, recordsString, { flag: 'a' });
}
console.log(process.uptime());
