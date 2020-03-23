const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  firstName: String,
  lastName: String,
  password: String,
  isAdmin: {
    type: Boolean
  }
})

UserSchema.index({ email: 1 });

var User = mongoose.model("User", UserSchema);
module.exports = User;