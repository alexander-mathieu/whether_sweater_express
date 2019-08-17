![Whether, Sweater? Express Screenshot](/whether_sweater_express_screenshot.png?raw=true "Whether, Sweater? Express Screenshot")

# Whether, Sweater? Express

## About

Welcome to _Whether, Sweater? Express_! This is a [Turing School of Software & Design](https://turing.io/) project completed during Module 4 of the backend engineering program. _Whether, Sweater? Express_ is a remake of Whether, Sweater? using Node, Express, Sequelize.  It exposes endpoints that produce weather data for specific locations, meant to be consumed by a hypothetical front end, pictured above.

## Endpoints

### POST /api/v1/users

Creates a user account, using an email, password, and password_confirmation passed in as form data in the body of the request.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```

Example of expected output:
```
{
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

### POST /api/v1/sessions

Authenticates a user, using an email and password passed in as form data in the body of the request.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "email": "my_email@example.com",
  "password": "password"
}
```

Example of expected output:
```
{
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

### GET /api/v1/forecast?location=denver,co

Returns the current weather for a location, as well as both 8-hour and 7-day forecasts.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

Example of expected output:
```
{
    "data": {
        "location": "denver,co",
        "currently": {
            "time": 1566070782,
            "summary": "Mostly Cloudy",
            "icon": "partly-cloudy-day",
            "nearestStormDistance": 3,
            "nearestStormBearing": 183,
            "precipIntensity": 0,
            "precipProbability": 0,
            "temperature": 88.66,
            "apparentTemperature": 88.66,
            "dewPoint": 32.95,
            "humidity": 0.14,
            "pressure": 1004.53,
            "windSpeed": 5.17,
            "windGust": 6.83,
            "windBearing": 65,
            "cloudCover": 0.71,
            "uvIndex": 6,
            "visibility": 10,
            "ozone": 302.5
        },
        "hourly": [
            {
                "time": 1566068400,
                "summary": "Mostly Cloudy",
                "icon": "partly-cloudy-day",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 88.31,
                "apparentTemperature": 88.31,
                "dewPoint": 33,
                "humidity": 0.14,
                "pressure": 1005.29,
                "windSpeed": 4.38,
                "windGust": 7.16,
                "windBearing": 61,
                "cloudCover": 0.63,
                "uvIndex": 7,
                "visibility": 8.885,
                "ozone": 300.4
            }
        ],
        "daily": [
            {
                "time": 1566021600,
                "summary": "Partly cloudy throughout the day.",
                "icon": "partly-cloudy-day",
                "sunriseTime": 1566044127,
                "sunsetTime": 1566093330,
                "moonPhase": 0.58,
                "precipIntensity": 0.0004,
                "precipIntensityMax": 0.0014,
                "precipIntensityMaxTime": 1566086400,
                "precipProbability": 0.11,
                "precipType": "rain",
                "temperatureHigh": 90.1,
                "temperatureHighTime": 1566086400,
                "temperatureLow": 58.82,
                "temperatureLowTime": 1566133200,
                "apparentTemperatureHigh": 90.1,
                "apparentTemperatureHighTime": 1566086400,
                "apparentTemperatureLow": 58.82,
                "apparentTemperatureLowTime": 1566133200,
                "dewPoint": 37.72,
                "humidity": 0.26,
                "pressure": 1006.13,
                "windSpeed": 5.68,
                "windGust": 21.49,
                "windGustTime": 1566090000,
                "windBearing": 201,
                "cloudCover": 0.29,
                "uvIndex": 7,
                "uvIndexTime": 1566064800,
                "visibility": 9.611,
                "ozone": 301.3,
                "temperatureMin": 65.18,
                "temperatureMinTime": 1566046800,
                "temperatureMax": 90.1,
                "temperatureMaxTime": 1566086400,
                "apparentTemperatureMin": 65.18,
                "apparentTemperatureMinTime": 1566046800,
                "apparentTemperatureMax": 90.1,
                "apparentTemperatureMaxTime": 1566086400
            }
        ]
    }
}
```

## Local Installation

### Requirements

* [Node 10.16.2](https://nodejs.org/en/download/) - Node Version

### Clone

```
$ git clone https://github.com/alexander-mathieu/whether_sweater_express.git
$ cd whether_sweater_express
$ npm install
```

### Setup Database

```
$ npx db:create
$ npx db:migrate
```

Additionally, you'll need:
* A [Dark Sky api key](https://darksky.net/dev/), and have it defined within
* A [Google api key](https://developers.google.com/maps/documentation/embed/get-api-key/), and have it defined within

### API Exploration

Once installation and database setup are complete, explore the various API endpoints with the following steps:
* From the `whether_sweater_express` project directory, boot up a server with `$ npm start`
* Open your browser, and visit `http://localhost:3000/`
* Query the available endpoints by appending to `http://localhost:3000/` in your browser

### Running Tests

Tests are implemnted with Jest, and can be run with `$ npm test`.
