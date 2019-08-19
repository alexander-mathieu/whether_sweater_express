var express = require('express');
var fetch = require('node-fetch');

var User = require('../../../models').User;

var darkskyService = require('../../../services/darksky_service')
var googleMapsService = require('../../../services/google_maps_service')
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
      googleMapsService = new googleMapsService(request.query.location);
      formattedLatLong = googleMapsService.retrieveFormattedLatLong();
      return formattedLatLong
      .then(formattedLatLong => {
        darkskyService = new darkskyService(formattedLatLong);
        forcastData = darkskyService.retrieveForcastData();
        return forcastData
      })
      .then(forecastData => {
        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(JSON.stringify({ data: new forecastSerializer(request.query.location, forecastData) }))
      })
      .catch(error => {
        response.setHeader('Content-Type', 'application/json');
        response.status(500).send(JSON.stringify({ error: error }))
      })
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(401).send(JSON.stringify({ error: 'API key is incorrect.' }))
    }
  })
})

module.exports = router;
