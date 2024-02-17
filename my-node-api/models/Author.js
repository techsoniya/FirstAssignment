// models/Author.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Author', authorSchema);
