const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const posts = require("./routes/posts");
const users = require("./routes/users");
const userPosts = require("./routes/userPosts");
const auth = require("./routes/auth");
const comments = require("./routes/comments");
const contact = require("./routes/contact");
const author = require("./routes/author");
const cookieParser = require('cookie-parser');

require('dotenv').config();

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
app.use(cookieParser());
app.use(morgan("combined"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/userPosts", userPosts);
app.use("/api/auth", auth);
app.use("/api/comments", comments);
app.use("/api/contact", contact);
app.use("/api/author", author);

app.get("/", (req, res) => {
  res.send(`The Api \n hit /api/posts to see a list of posts`);  
});

app.use((err, req, res, next) => res.status(err.status).json(err));

process.env.URL = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'http://178.62.84.235/'; 
console.log(process.env.NODE_ENV);
console.log(process.env.URL);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
