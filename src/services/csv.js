const fs = require('fs');
const {parse} = require('csv-parse');
const db = require('../database/sqlite');

const loadCSVInMemory = (isTest = false) => {
  db.serialize(() => {
    db.run(`CREATE TABLE movie (id INTEGER PRIMARY KEY, year INTEGER, title TEXT, studios TEXT, producers TEXT, winner TEXT)`);
    if (!isTest) {
        fs.createReadStream('./src/attachment/movielist.csv')
        .pipe(parse({ delimiter: ";", from_line: 2 }))
        .on('data', (row) => {
            db.run(`INSERT INTO movie (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
            [row[0], row[1], row[2], row[3], row[4]]);
        })
        .on('end', () => {
            console.log('Finalizada importação.');
        })
        .on("error", (error) => {
            console.log(error.message);
        });
    }
  });
};

module.exports = { loadCSVInMemory };