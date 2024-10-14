const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

router.get('/movies', movieController.getAllMovies);
router.get('/movies/getById', movieController.getMovieById);
router.get('/movies/worstproducer', movieController.getWorstProducer);
router.post('/movies', movieController.createMovie);
router.put('/movies/updateById', movieController.updateMovie);
router.delete('/movies/deleteById', movieController.deleteMovie);

module.exports = router;