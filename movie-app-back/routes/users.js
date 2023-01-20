const express = require("express");
const { User, validate, validateMovies } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const auth = require("../middleware/auth");
const { Movie } = require("../models/movie");

const getMovies = async (moviesArray) => {
  const movies = await Movie.find({ movieNumber: { $in: moviesArray } });
  return movies;
};

router.get("/movies", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.movies = req.query.numbers.split(",");

  const movies = await getMovies(data.movies);
  res.send(movies);
});

router.patch("/movies", auth, async (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const movies = await getMovies(req.body.cards);
  if (movies.length != req.body.movies.length)
    res.status(400).send("Movie numbers don't match");

  let user = await User.findById(req.user._id);
  user.movies = req.body.movies;
  user = await user.save();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.body._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "vip", "movies"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
