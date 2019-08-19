var express = require('express');
var fetch = require('node-fetch');

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

router.get('/', (request, response) => {
  return User.findOne({
    where: {
      apiKey: request.body.api_key
    }
  })
  .then(user => {
    if (user) {
      return user.getLocations()
      .then(locations => {
        let allLocationWeather = []

        locations.forEach(location => {
          let formattedLocation = _formatLocation(location)

          fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${formattedLocation}`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            let latLong = data.results[0].geometry.location;
            let formattedLatLong = _formatLatLong(latLong);
            return formattedLatLong
          })
          .then(formattedLatLong => {
            return fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${formattedLatLong}`)
          })
          .then(response => {
            return response.json();
          })
          .then(data => {
            let locationWeather = {};

            locationWeather.location = formattedLocation;
            locationWeather.currently = data.currently;

            allLocationWeather.push(locationWeather);

            if (allLocationWeather.length == locations.length) {
              response.setHeader('Content-Type', 'application/json');
              response.status(200).send(JSON.stringify({ data: allLocationWeather }));
            }
          })
        })
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(401).send(JSON.stringify({ error: 'API key is incorrect.' }));
    }
  })
})

router.delete('/', (request, response) => {
  return User.findOne({
    where: {
      apiKey: request.body.api_key
    }
  })
  .then(user => {
    if (user) {
      let cityState = _splitLocation(request.body.location);

      return Location.destroy({
        where: {
          UserId: user.id,
          city: cityState[0],
          state: cityState[1]
        }
      })
      .then(location => {
        response.setHeader('Content-Type', 'application/json');
        response.status(204).send(JSON.stringify({ location: location}));

      })
      .catch(error => {
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send({ error });
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

var _formatLocation = (location) => {
  let combinedLocation =  String(location.city) + ',' + String(location.state);
  let formattedLocation = combinedLocation.toLowerCase();
  return formattedLocation
}

var _formatLatLong = (latLong) => {
  return (String(latLong.lat) + ',' + String(latLong.lng));
}

module.exports = router;
