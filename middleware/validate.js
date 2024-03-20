const validator = require('../helpers/validate');

const saveMovies = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    director: 'required|string',
    year: 'required|int',
    genre: 'required|string',
    rating: 'required|int',
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