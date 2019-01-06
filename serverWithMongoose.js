var mongoose = require('mongoose');
var User = require('./model/UserModel');
var UserController = require('./controller/UserController');

// mongoose.connect('mongodb://hickok:rabbits99@ds145484.mlab.com:45484/fof-users')
mongoose.connect('mongodb://localhost/testusers');
//
// var newUser = new User({
//   username: 'Ashe',
//   password: 'Bob!DoSomething!'
// });
//
// newUser.save(function(err) {
//   if (err) throw err;
//
//   console.log('User saved successfully!');
// });
console.log('hello am I a mongoose')

UserController.query()
