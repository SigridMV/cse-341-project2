const validator = require('../helpers/validate');

const saveMovies = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    director: 'required|string',
    year: 'required|number',
    genre: 'required|string',
    rating: 'required|number',
    actor: 'required|string',
    plot: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMovies
};