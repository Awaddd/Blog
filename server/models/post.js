const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  summary: String,
  content: String,
  image: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

PostSchema.index({ title: 1 });

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
