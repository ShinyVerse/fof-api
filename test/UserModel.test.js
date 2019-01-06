const chai = require("chai");
const expect = chai.expect;
var User = require('../model/UserModel');
var mongoose = require('mongoose');
var dbHelper = require('../helper_functions/DatabaseHelper')
var UserHelper = require('../helper_functions/UserHelper')

describe('test query', function() {

  before(function (done) {
    dbHelper.openDBConnection();
    done();
  });

  it('no users', function(done) {
    User.find({}, (err, users) => {
        if(err) {throw err;}
        expect(users.length).to.equal(0)
        done();
      });
  })

  it('find one user', function(done) {

    // Pre-condition: Add a user
    UserHelper.createUser('ashe', 'Bob!DoSomething!')

    User.find({}, (err, users) => {
        if(err) {throw err;}
        expect(users.length).to.equal(0)
        done();
      });
  })

  after(function(done){
    dbHelper.closeDBConnection(done);
  });

});
