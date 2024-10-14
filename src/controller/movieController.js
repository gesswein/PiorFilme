const movieModel = require('../models/movie');

const getAllMovies = (req, res) => {
  movieModel.getAllMovies((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

const getMovieById = (req, res) => {
  movieModel.getMovieById(req.query.id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }
    res.json(row);
  });
};

const getWorstProducer = async (req, res) => {
  let result = { min: [], max: [] };

  try {
    const longestIntervalRows = await movieModel.getLongestIntervalWinner();
    const fasterWinnerRows = await movieModel.getFasterWinnerTwoAwards();

    result.max = longestIntervalRows;
    result.min = fasterWinnerRows;

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMovie = (req, res) => {
  const movie = req.body;
  movieModel.createMovie(movie, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(movie);
  });
};

const updateMovie = (req, res) => {
  const movie = req.body;
  movieModel.updateMovie(req.query.id, movie, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(movie);
  });
};

const deleteMovie = (req, res) => {
  movieModel.deleteMovie(req.query.id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = { getAllMovies, getMovieById, getWorstProducer, createMovie, updateMovie, deleteMovie };
