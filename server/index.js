const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const posts = require("./routes/posts");

const CONNECTION_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/blog";

mongoose.connect(
  CONNECTION_URI,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", function(callback) {
  console.log("Connected to the database.");
});

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/posts", posts);

app.get("/", (req, res) => {
  res.send(`The Api`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
