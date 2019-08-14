var bcrypt = require('bcrypt');
var express = require('express');
var uuidv4 = require('uuid/v4');

var User = require('../../../models').User;
var router = express.Router();

router.post('/', (request, response) => {
  User.create({
    email: request.body.email,
    password: _hashedPassword(request.body.password),
    api_key: uuidv4()
  })
  .then(user => {
    response.setHeader('Content-Type', 'application/json');
    response.status(201).send(JSON.stringify({ api_key: user.api_key }));
  })
  .catch(error => {
    response.setHeader('Content-Type', 'application/json');
    response.status(400).send({ error });
  });
});

var _hashedPassword = (password) => {
  let saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

module.exports = router;
