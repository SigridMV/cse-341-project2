//API endpoints
const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler');

const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.createMovie);

router.put('/:id', moviesController.updateMovie);

router.delete('/:id', moviesController.deleteMovie);

router.use(errorHandler);

module.exports = router;