const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
})

let Discussion = mongoose.model("Discussion", DiscussionSchema);
module.exports = Discussion;