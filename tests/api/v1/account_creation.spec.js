var request = require('supertest');
var shell = require('shelljs');

var app = require('../../../app');
var User = require('../../../models').User;

describe('test account creation endpoint', () => {
  test('returns an API key when correct information is passed', () => {
    return request(app)
    .post('/api/v1/users')
    .send({
      email: 'usercreate1@example.com',
      password: 'password',
      password_confirmation: 'password'
    })
    .then(response => {
      expect(response.statusCode).toBe(201);
      expect(Object.keys(response.body)).toContain('api_key');
    })
  })

  test('returns an error when password does not match confirmation', () => {
    return request(app)
    .post('/api/v1/users')
    .send({
      email: 'usercreate2@example.com',
      password: 'password',
      password_confirmation: 'notpassword'
    })
    .then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toEqual("Passwords don't match!");
    })
  })

  test('returns an error when information is missing', () => {
    return request(app)
    .post('/api/v1/users')
    .send({
      password: 'password',
      password_confirmation: 'password'
    })
    .then(response => {
      expect(response.statusCode).toBe(400);
      expect(Object.keys(response.body)).toContain('error');
    })
  })

  test('returns an error when email has been taken', () => {
    return User.create({
      email: 'usercreate4@example.com',
      password: 'password',
      apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(user => {
      return request(app)
      .post('/api/v1/users')
      .send({
        email: user.email,
        password: 'password',
        password_confirmation: 'password'
      })
    })
    .then(response => {
      expect(response.statusCode).toBe(400);
      expect(Object.keys(response.body)).toContain('error');
    })
  })
})
