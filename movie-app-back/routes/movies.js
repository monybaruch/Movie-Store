const express = require("express");
const _ = require("lodash");

const {
  Movie,
  validateMovie,
  generateMovieNumber,
} = require("../models/movie");
const auth = require("../middleware/auth");
const router = express.Router();

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = await Movie.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    req.body
  );
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  movie = await Movie.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(movie);
});

router.get("/:id", auth, async (req, res) => {
  const movie = await Movie.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({
    movieName: req.body.movieName,
    movieDescription: req.body.movieDescription,
    movieGenre: req.body.movieGenre,
    movieImage: req.body.movieImage
      ? req.body.bmovieImage
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    movieNumber: await generateMovieNumber(Movie),
    user_id: req.user._id,
  });

  post = await movie.save();
  res.send(post);
});
module.exports = router;
