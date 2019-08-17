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
        'location': 'Denver, CO',
        'api_key': user.apiKey
      })
    })
    .then(response => {
      expect(response.statusCode).toBe(201);
      expect(Object.keys(response.body)).toContain('message');
      expect(Object.values(response.body.message)).toContain('Denver, CO has been added to your favorites')
    })
  })
})
