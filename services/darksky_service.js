var fetch = require('node-fetch');

class darkskyService {
  constructor (formattedLatLong) {
    this.formattedLatLong = formattedLatLong
  }

  retrieveForcastData () {
    return fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${this.formattedLatLong}`)
    .then(response => {
      return response.json();
    })
  }
}

module.exports = darkskyService;
