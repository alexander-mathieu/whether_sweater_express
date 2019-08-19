var express = require('express');

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
      let _googleMapsService = new googleMapsService(request.query.location);
      let formattedLatLong = _googleMapsService.retrieveFormattedLatLong();
      return formattedLatLong
      .then(formattedLatLong => {
        let _darkskyService = new darkskyService(formattedLatLong);
        let forcastData = _darkskyService.retrieveForcastData();
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
