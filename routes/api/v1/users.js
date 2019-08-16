var bcrypt = require('bcrypt');
var express = require('express');
var uuidv4 = require('uuid/v4');

var User = require('../../../models').User;

var router = express.Router();

router.post('/', (request, response) => {
  if (request.body.password != request.body.password_confirmation) {
    response.setHeader('Content-Type', 'application/json');
    response.status(400).send(JSON.stringify({ error: "Passwords don't match!" }));
  } else {
    User.create({
      email: request.body.email,
      password: _hashedPassword(request.body.password),
      apiKey: uuidv4()
    })
    .then(user => {
      response.setHeader('Content-Type', 'application/json');
      response.status(201).send(JSON.stringify({ api_key: user.apiKey }));
    })
    .catch(error => {
      response.setHeader('Content-Type', 'application/json');
      response.status(400).send({ error: error });
    })
  }
})

var _hashedPassword = (password) => {
  let saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

module.exports = router;
