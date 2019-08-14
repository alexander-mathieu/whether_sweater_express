var express = require('express');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var router = express.Router();
var User = require('../../../models').User;

router.post('/', function(req, res) {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(user.api_key));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send({ error: 'Failed to create user' });
  });
});

module.exports = router;

// bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
//     // Store hash in your password DB.
// });
