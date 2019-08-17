var bcrypt = require('bcrypt');
var request = require('supertest');
var shell = require('shelljs');

var app = require('../../../app');
var User = require('../../../models').User;

describe('test forecast endpoint', () => {
  beforeAll(() => {
    // shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');

    return User.create({
                        email: 'forecast@example.com',
                        password: 'password',
                        apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
                      })
  })

  afterAll(() => {
    shell.exec('npx sequelize db:seed:undo:all');
    shell.exec('npx sequelize db:migrate:undo:all');
  })

  test('returns an forecast when valid API key is passed', () => {
    return request(app)
    .get('/api/v1/forecast?location=denver,co')
    .send({
      api_key: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body)).toContain('data');
    })
  })

  test('returns unauthorized when an incorrect API key is passed', () => {
    return request(app)
    .get('/api/v1/forecast?location=denver,co')
    .send({
      api_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    })
    .then(response => {
      expect(response.statusCode).toBe(401);
      expect(Object.values(response.body)).toContain('API key is incorrect.');
    })
  })
})
