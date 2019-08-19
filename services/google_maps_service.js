var fetch = require('node-fetch');

class googleMapsService {
  constructor(location) {
    this.location = location
  }

  retrieveFormattedLatLong() {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${this.location}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let latLong = data.results[0].geometry.location;
      let formattedLatLong = _formatLatLong(latLong);
      return formattedLatLong
    })
  }
}

var _formatLatLong = (latLong) => {
  return (String(latLong.lat) + ',' + String(latLong.lng));
}

module.exports = googleMapsService;
