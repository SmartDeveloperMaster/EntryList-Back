const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
function mongooseConnect(url) {
  mongoose.connect(url,  
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => {
      console.log(`MongoDB connected to ${result.connection.host}`);
    })
    .catch((err) => {
      console.log(`error connection to the database: ${err}`);
    });
}

module.exports = mongooseConnect;