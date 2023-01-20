const express = require("express");
const users = require("./routes/users");
const app = express();
const cors = require("cors");
const movies = require("./routes/movies");
const auth = require("./routes/auth");
const http = require("http").Server(app);
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/movie-app-back", {})
  .then(() => console.log("Connected successfully to MongoDB..."))
  .catch((err) => console.log("Could not connect successfully to MongoDB..."));
mongoose.set("strictQuery", true);

app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/movies", movies);
const port = 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
