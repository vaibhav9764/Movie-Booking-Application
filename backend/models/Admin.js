const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  addMovies: [{
     type: mongoose.Types.ObjectId,
     ref:"Movie" }],
});

module.exports = mongoose.model("Admin", adminSchema);
