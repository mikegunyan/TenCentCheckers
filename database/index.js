const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = mongoose.connect(`mongodb://${process.env.HOST || 'localhost'}/boardlist`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo'))
  .catch((err) => console.log(err));

module.exports = db;
