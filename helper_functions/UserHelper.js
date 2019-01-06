var User = require('../model/UserModel');

function createUser(username, password) {
  var newUser = new User({
    username: username,
    password: password
  });
   newUser.save();
}

module.exports = {
  createUser : createUser
}
