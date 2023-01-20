const Joi = require("joi");
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  movieDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  movieGenre: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  movieNumber: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
    unique: true,
  },
  movieImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    movieName: Joi.string().min(2).max(100).required(),
    movieDescription: Joi.string().min(2).max(1024).required(),
    movieGenre: Joi.string().min(2).max(400).required(),
    movieImage: Joi.string().min(11).max(1024),
  });

  return schema.validate(movie);
}
async function generateMovieNumber(Movie) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let movie = await Movie.findOne({ movieNumber: randomNumber });
    if (!movie) return String(randomNumber);
  }
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
exports.generateMovieNumber = generateMovieNumber;
