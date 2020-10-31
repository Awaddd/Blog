const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  summary: String,
  content: String,
  createdAt: {type: Date, default: Date.now},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

AuthorSchema.index({ title: 1 });

let Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
