//Movies Controller
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  //#swagger.tag=['Movies']
  mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .find()
    .toArray((err, lists) => {
      if(err){
        res.status(400).json({message: err});
      }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  }); 
};

const getSingle = (req, res) => {
  //#swagger.tag=['Movies']
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json('Must use a valid movie id to find a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .find({ _id: movieId })
    .toArray ((err, result) => {
      if(err){
        res.status(400).json({message: err});
      }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result[0]);
    });
};

const createMovie = async (req, res) => {
  //#swagger.tag=['Movies']
  const movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
    rating: req.body.rating,
    actor: req.body.actors,
    plot: req.body.plot,
  };
  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .insertOne(movie);
  if (response.acknowledge) {
    res.status(201).send(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while updating the movie.");
  }
};

const updateMovie = async (req, res) => {
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json('Must use a valid movie id to update a movie.');
  }
  //#swagger.tag=['Movies']
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
    rating: req.body.rating,
    actor: req.body.actors,
    plot: req.body.plot,
  };
  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .replaceOne({ _id: movieId }, movie);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the movie.");
  }
};

const deleteMovie = async (req, res) => {
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json('Must use a valid movie id to delete a movie.');
  }
  //#swagger.tag=['Movies']
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .deleteOne({ _id: movieId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the movie.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
