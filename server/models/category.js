const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String
})

let Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
