const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const { join } = require("lodash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlenght: 2,
    maxlenght: 100,
  },
  email: {
    type: String,
    require: true,
    minlenght: 6,
    maxlenght: 100,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlenght: 6,
    maxlenght: 20,
  },
  vipMember: {
    type: String,
    require: true,
  },
  movies: Array,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, vipMember: this.vipMember },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(20).required(),
    vipMember: Joi.boolean().required(),
  });
  return schema.validate(user);
}

function validateMovies(data) {
  const schema = Joi.object({
    cards: join.Array().min(1).required(),
  });
  return schema.validateMovies;
}
exports.User = User;
exports.validate = validateUser;
exports.validateMovies = validateMovies;
