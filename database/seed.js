
const faker = require('faker');
const db = require('./index.js');

function getRandomInt(min1, max1) {
  const min = Math.ceil(min1);
  const max = Math.floor(max1);
  return Math.floor(Math.random() * (max - min)) + min;
}

const seedData = () => {
  for (let ex = 1; ex < 101; ex += 1) {
    const photoCount = getRandomInt(9, 21);
    for (let k = 1; k <= photoCount; k += 1) {
      const photoIdentification = getRandomInt(100, 201);
      const photoPath = `https://tlguestphotos.s3-us-west-2.amazonaws.com/teamleia/photo-${photoIdentification}.jpg`;

      const fakeName = faker.name.firstName();
      const fakeAlt = faker.random.word();

      db.db.query(`INSERT INTO photos (photoUrl, alt, username, experienceId) VALUES ('${photoPath}','${fakeAlt}', '${fakeName}', ${ex})`, (err, result) => {
        if (err) {
          console.log('SEED ERROR: ', err);
        } else {
          console.log('Seed Success: ', result);
        }
      });
    }
  }
};

seedData();

module.exports = seedData;
