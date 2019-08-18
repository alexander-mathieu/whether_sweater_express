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

### POST /api/v1/favorites

Creates a new favorite location for a user.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "location": "Denver, CO",
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

Example of expected output:
```
{
  "message": "Denver, CO has been added to your favorites."
}
```

### GET /api/v1/favorites

Lists the current weather for all of a user's favorite locations.

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
    "data": [
        {
            "location": "pueblo,co",
            "currently": {
                "time": 1566157171,
                "summary": "Clear",
                "icon": "clear-day",
                "nearestStormDistance": 276,
                "nearestStormBearing": 97,
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 93.66,
                "apparentTemperature": 93.66,
                "dewPoint": 39.23,
                "humidity": 0.15,
                "pressure": 1007.47,
                "windSpeed": 8.63,
                "windGust": 12.45,
                "windBearing": 135,
                "cloudCover": 0.01,
                "uvIndex": 10,
                "visibility": 10,
                "ozone": 292.2
            }
        },
        {
            "location": "denver,co",
            "currently": {
                "time": 1566157171,
                "summary": "Partly Cloudy",
                "icon": "partly-cloudy-day",
                "nearestStormDistance": 323,
                "nearestStormBearing": 115,
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 78.89,
                "apparentTemperature": 78.89,
                "dewPoint": 48.73,
                "humidity": 0.35,
                "pressure": 1009.42,
                "windSpeed": 4.5,
                "windGust": 6.24,
                "windBearing": 53,
                "cloudCover": 0.14,
                "uvIndex": 9,
                "visibility": 10,
                "ozone": 291.5
            }
        }
    ]
}
```

### DELETE /api/v1/favorites

Deletes a favorite location for a user.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "location": "Denver, CO",
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

Example of expected output:
```
status: 204
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
* A [DARKSKY_API_KEY](https://darksky.net/dev/), and have it defined within a file in the root directory named `.env`.
* A [GOOGLE_MAPS_API_KEY](https://developers.google.com/maps/documentation/embed/get-api-key/), and have it defined within a file in the root directory named `.env`.

### API Exploration

Once installation and database setup are complete, explore the various API endpoints with the following steps:
* From the `whether_sweater_express` project directory, boot up a server with `$ npm start`
* Open your browser, and visit `http://localhost:3000/`
* Query the available endpoints by appending to `http://localhost:3000/` in your browser

### Running Tests

Tests are implemnted with Jest, and can be run with `$ npm test`.

Example of expected output:
```
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        4.725s
Ran all test suites.
```
