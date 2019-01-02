var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db;

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});


//generic error handler used by all endpoints
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/users", function(req, res) {
  MongoClient.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }, function (err, client) {
    if (err) throw err
    db = client.db('fof-users')

    db.collection('users').find().toArray(function (err, result) {
        return res.status(201).send({
          success: 'true',
          message: 'users received',
          users: result.map(user => user.username)
        })
    });
  });
});
//
// app.post("/testing", function(req, res) {
//   MongoClient.connect(MONGODB_URI,{ useNewUrlParser: true }, function (err, client) {
//     if (err) throw err
//     db = client.db('fof-users')
//
//     db.collection('users').find().toArray(function (err, result) {
//       if (err) throw err
//       return result
//     });
//   });
// });

app.post("/createuser", function(req, res) {
  MongoClient.connect(process.env.MONGODB_URI,{ useNewUrlParser: true }, function (err, client) {
    console.log("Here is the env uri ::::" + process.env.MONGODB_URI);
    db = client.db('fof-users');

    db.collection('users').find().toArray(function (err, result) {
      //check for blank username or password
      if ((!req.body.username || !req.body.password )) {
         return handleError(res, "Invalid entry", "Must provide a username and a password!", 400);
      }
      //checks if username is in use already in database
      if (result.filter(user => { return user.username == req.body.username.toLowerCase();}).length >= 1) {
        return handleError(res, 'Username must be unique', 'username already exists!', 400);
      }
      // adds new entry if passes through previous checks.
      db.collection('users').insertOne({
        username: req.body.username.toLowerCase(),
        password: req.body.password
      }, function(err, doc) {
        if (err) {
          return handleError(res, err.message, "Failed to create new user");
        } else {
          return res.status(201).json(doc.ops[0])
        }
      });
    });
  });
})
