var mongoose = require('mongoose');

function openDBConnection() {
  mongoose.connect('mongodb://localhost/testusers');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function() {
    console.log('We are connected to test database!');
  });
}
function closeDBConnection(done) {
  mongoose.connection.db.dropDatabase(function(){
    mongoose.connection.close(done);
  });
}

module.exports = {
  openDBConnection: openDBConnection,
  closeDBConnection: closeDBConnection
}
