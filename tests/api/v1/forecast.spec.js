var bcrypt = require('bcrypt');
var request = require('supertest');
var shell = require('shelljs');

var app = require('../../../app');
var User = require('../../../models').User;

describe('test forecast endpoint', () => {
  test('returns an forecast when valid API key is passed', () => {
    return User.create({
      email: 'forecast@example.com',
      password: 'password',
      apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(user => {
      return request(app)
      .get('/api/v1/forecast?location=denver,co')
      .send({
        api_key: user.apiKey
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body)).toContain('data');
        expect(Object.keys(response.body.data)).toContain('location');
        expect(Object.keys(response.body.data)).toContain('currently');
        expect(Object.keys(response.body.data)).toContain('hourly');
        expect(Object.keys(response.body.data)).toContain('daily');

        expect(response.body.data.hourly.length).toEqual(8);
        expect(response.body.data.daily.length).toEqual(7);
      })
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
      expect(response.body.error).toEqual('API key is incorrect.');
    })
  })
})
