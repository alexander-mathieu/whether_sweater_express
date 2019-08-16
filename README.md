![Whether, Sweater? Express Screenshot](/whether_sweater_express_screenshot.png?raw=true "Whether, Sweater? Express Screenshot")

# Whether, Sweater? Express

## About

Welcome to _Whether, Sweater? Express_! This is a [Turing School of Software & Design](https://turing.io/) project completed during Module 4 of the backend engineering program. _Whether, Sweater? Express_ is a remake of Whether, Sweater? using Node, Express, Sequelize.  It exposes endpoints that produce weather data for specific locations, meant to be consumed by a hypothetical front end, pictured above.

## Endpoints

```
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
