const db = require('../database/sqlite');
const {sqlLongestInterval}=require('../database/longestInterval');
const {sqlFasterWinnerTwoAwards}=require('../database/fasterWinnerTwoAwards');

const getAllMovies = (callback) => {
  db.all('SELECT * FROM movie', [], (err, rows) => {
    callback(err, rows);
  });
};

const getMovieById = (id, callback) => {
  db.get('SELECT * FROM movie WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

const getLongestIntervalWinner = () => {
    return new Promise((resolve, reject) => {
        db.all(sqlLongestInterval, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            }
        );
    });
};

const getFasterWinnerTwoAwards = () => {
    return new Promise((resolve, reject) => {
        db.all(sqlFasterWinnerTwoAwards, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const createMovie = (movie, callback) => {
  const { year, title, studios, producers, winner } = movie;
  db.run('INSERT INTO movie (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)', [year, title, studios, producers, winner], callback);
};

const updateMovie = (id, movie, callback) => {
  const { year, title, studios, producers, winner } = movie;
  db.run('UPDATE movie SET year = ?, title = ?, studios = ?, producers=?, winner=? WHERE id = ?', [year, title, studios, producers, winner, id], callback);
};

const deleteMovie = (id, callback) => {
  db.run('DELETE FROM movie WHERE id = ?', [id], callback);
};

module.exports = { getAllMovies, getMovieById, getLongestIntervalWinner, getFasterWinnerTwoAwards, createMovie, updateMovie, deleteMovie };
