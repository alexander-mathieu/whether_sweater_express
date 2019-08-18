var express = require('express');

var User = require('../../../models').User;
var Location = require('../../../models').Location;

var router = express.Router();

router.post('/', (request, response) => {
  return User.findOne({
    where: {
      apiKey: request.body.api_key
    }
  })
  .then(user => {
    if (user) {
      let cityState = _splitLocation(request.body.location);

      return Location.create({
        city: cityState[0],
        state: cityState[1],
        UserId: user.id
      })
      .then(location => {
        response.setHeader('Content-Type', 'application/json');
        response.status(201).send(JSON.stringify({ message: `${location.city}, ${location.state} has been added to your favorites.`}));
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(401).send(JSON.stringify({ error: 'API key is incorrect.' }));
    }
  })
})

var _splitLocation = (location) => {
  let cityState = location.split(', ');
  return cityState;
}

module.exports = router;
