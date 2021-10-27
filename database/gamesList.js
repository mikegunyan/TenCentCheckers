const mongoose = require('mongoose');
const db = require('./index');

const schema = new mongoose.Schema({
  games: Array,
  bugs: Array,
  messages: Array,
});

const Games = mongoose.model('Games', schema);

module.exports = Games;
