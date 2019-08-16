var bcrypt = require('bcrypt');
var express = require('express');

var User = require('../../../models').User;

var router = express.Router();

router.post('/', (request, response) => {
  User.findOne({
    where: {
      email: request.body.email
    }
  })
  .then(user => {
    if (user && _passwordMatch(request.body.password, user.password)) {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).send(JSON.stringify({ api_key: user.apiKey }));
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(401).send(JSON.stringify({ error: 'Email or password is incorrect.' }));
    }
  })
})

var _passwordMatch = (enteredPassword, hashedPassword) => {
  return bcrypt.compareSync(enteredPassword, hashedPassword);
};

module.exports = router;
