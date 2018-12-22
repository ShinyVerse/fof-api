import bodyParser from 'body-parser';
import express from 'express';
import db from './db/db';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  }
  const user = {
    id: db.length + 1,
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

app.get('/api/v1/users', (req, res) => {
  res.status(201).send({
    success: 'true',
    message: 'users received',
    users: db
  })
});

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
