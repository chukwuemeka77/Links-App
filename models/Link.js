//npm install express mongoose body-parser cors
// models/Link.js
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, required: true },
});

module.exports = mongoose.model('Link', linkSchema);
