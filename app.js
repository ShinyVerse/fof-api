import bodyParser from 'body-parser';
import express from 'express';
import db from './db/db';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//make new user
app.post('/api/v1/users', (req, res) => {
  if (!req.body.username) {
    return res.status(400).send({
      success: 'false',
      message: 'username is required'
    });
  } else if (!req.body.password) {
    return res.status(400).send({
      success: 'false',
      message: 'password is required'
    });
  } else if (db.filter(user => {
    return user.username.toLowerCase() == req.body.username.toLowerCase()
  }).length == 1) {
      return res.status(400).send({
        success: 'false',
        message: 'username already exists!'
    });
  }
  const userIDs = db.map(obj => { return obj.id });
  console.log(userIDs);
  const highestID = Math.max(...userIDs);
    console.log(highestID);
  const user = {
    id: highestID + 1,
    username: req.body.username,
    password: req.body.password
  }
  db.push(user);
  return res.status(200).send({
    success: 'true',
    message: 'user has been added',
    user
  })
});

//get all users
app.get('/api/v1/users', (req, res) => {
  res.status(201).send({
    success: 'true',
    message: 'users received',
    users: db
  })
});

// get individual
app.get('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((user) => {
    if (user.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'user retrieved successfully',
        user,
      });
    }
  });
 return res.status(404).send({
   success: 'false',
   message: 'user does not exist',
 });
});

//delete users
app.delete('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((user, index) => {
    if (user.id === id) {
       db.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'user deleted successfuly',
       });
    }
  });
    return res.status(404).send({
      success: 'false',
      message: 'user not found',
    });
});

//update user password
app.put('/api/v1/users', (req, res) => {
  let username =  req.body.username.toLowerCase();
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  if ((!username) || (!password) || (!newPassword)) {
    return res.status(400).send({
      success: 'false',
      message: 'username, password and new password required'
    })
  }
  db.map(user => {
    if ((user.username.toLowerCase() == username) && (user.password == password)) {
      user.password = newPassword;
      return res.status(202).send({
        success: 'true',
        message: 'user has been updated'
      })
    }
  })
  return res.status(400).send({
    success: 'false',
    message: "user doesn't exist, or user or password didn't match"
  })
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
