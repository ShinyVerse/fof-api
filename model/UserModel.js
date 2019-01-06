var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date
});

userSchema.pre('save', function(next){
  var currentDate = new Date();
  this.created_at = currentDate;
  next();
})

//TODO: Add encryption

var User = mongoose.model('User', userSchema);

module.exports = User;
