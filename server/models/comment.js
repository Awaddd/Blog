const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommmentSchema = new Schema({
  content: String,
  hearts: Number,
  createdAt: {type: Date, default: Date.now},
  discussion_id: {
    type: Schema.Types.ObjectId, ref: 'Discussion', required: true
  },
  author: {
    type: Schema.Types.ObjectId, ref: 'User', required: true
  },
  post: {
    type: Schema.Types.ObjectId, ref: 'Post', required: true
  }
});


let Comment = mongoose.model("Comment", CommmentSchema);
module.exports = Comment;