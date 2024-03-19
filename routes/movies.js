//API endpoints
const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', validation.saveMovies, moviesController.createMovie);

router.put('/:id', validation.saveMovies, moviesController.updateMovie);

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;