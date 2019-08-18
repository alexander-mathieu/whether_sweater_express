var request = require('supertest');
var shell = require('shelljs');

var app = require('../../../app');
var User = require('../../../models').User;
var Location = require('../../../models').Location;

describe('favorite locations endpoint', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  })

  test('creates a new favorite location when a valid API key is sent', () => {
    return User.create({
      email: 'userfavorites1@example.com',
      password: 'password',
      apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(user => {
      return request(app)
      .post('/api/v1/favorites')
      .send({
        location: 'Denver, CO',
        api_key: user.apiKey
      })
    })
    .then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toEqual('Denver, CO has been added to your favorites.');
    })
  })

  test('does not create a new favorite location when incorrect API key is sent', () => {
    return request(app)
    .post('/api/v1/favorites')
    .send({
      location: 'Denver, CO',
      api_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    })
    .then(response => {
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toEqual('API key is incorrect.');
    })
  })

  test('lists favorite locations and current weather for a user when a valid API key is sent', () => {
    return User.create({
      email: 'userfavorites2@example.com',
      password: 'password',
      apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(user => {
      return request(app)
      .get('/api/v1/favorites')
      .send({
        api_key: user.apiKey
      })
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('list');
    })
  })

  test('does not return a list of favorite locations and current weather when incorrect API key is sent', () => {
    return request(app)
    .get('/api/v1/favorites')
    .send({
      api_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    })
    .then(response => {
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toEqual('API key is incorrect.');
    })
  })
})
