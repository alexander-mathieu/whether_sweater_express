require('dotenv').config();

var express = require('express');
var fetch = require('node-fetch');

var User = require('../../../models').User;
var forecastSerializer = require('../../../serializers/forecast_serializer')

var router = express.Router();

router.get('/', (request, response) => {
  User.findOne({
    where: {
      apiKey: request.body.api_key
    }
  })
  .then(user => {
    if (user) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${request.query.location}`)
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
        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(JSON.stringify({ data: new forecastSerializer(request.query.location, data) }))
      })
      .catch(error => {
        console.log(error)
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send(JSON.stringify({ error: error }))
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(401).send(JSON.stringify({ error: 'API key is incorrect.' }))
    }
  })
})

var _retrieveForcast = (formattedLatLong) => {
  // fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${formattedLatLong}`)
  // .then(response => {
  //   return response.json();
  // })
  //   .then(data => {
  //     response.setHeader('Content-Type', 'application/json');
  //     response.status(200).send(JSON.stringify({ data: data }))
  //   })
  //   .catch(error => {
  //     response.setHeader('Content-Type', 'application/json');
  //     response.status(500).send(JSON.stringify({ error: error }))
  //   })
  // .catch(error => {
  //   response.setHeader('Content-Type', 'application/json');
  //   response.status(500).send(JSON.stringify({ error: error }))
  // })
}

var _formatLatLong = (latLong) => {
  return (String(latLong.lat) + ',' + String(latLong.lng));
}

var _retrieveLatLong = (location) => {
  // fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${location}`)
  // .then(response => {
  //   return response.json();
  // })
  //   .then(data => {
  //     response.setHeader('Content-Type', 'application/json');
  //     response.status(200).send(JSON.stringify({ data: data['results'][0]['geometry']['location'] }))
  //   })
  //   .catch(error => {
  //     response.setHeader('Content-Type', 'application/json');
  //     response.status(500).send(JSON.stringify({ error: error }))
  //   })
  // .catch(error => {
  //   response.setHeader('Content-Type', 'application/json');
  //   response.status(500).send(JSON.stringify({ error: error }))
  // })
}

module.exports = router;
