var bcrypt = require('bcrypt');
var request = require('supertest');
var shell = require('shelljs');

var app = require('../../../app');
var User = require('../../../models').User;

var _hashedPassword = (password) => {
  let saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

describe('test account login endpoint', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  })

  test('returns an API key when correct information is passed', () => {
    return User.create({
      email: 'userlogin1@example.com',
      password: _hashedPassword('password'),
      apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(user => {
      return request(app)
      .post('/api/v1/sessions')
      .send({
        email: user.email,
        password: 'password'
      })
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body.api_key).toEqual('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');
    })
  })

  test('returns an error when incorrect email is sent', () => {
    return User.create({
      email: 'userlogin2@example.com',
      password: _hashedPassword('password'),
      apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(user => {
      return request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'notuserlogin@example.com',
        password: user.password
      })
    })
    .then(response => {
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toEqual('Email or password is incorrect.');
    })
  })

  test('returns an error when incorrect password is sent', () => {
    return User.create({
      email: 'user3login@example.com',
      password: _hashedPassword('password'),
      apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
    })
    .then(user => {
      return request(app)
      .post('/api/v1/sessions')
      .send({
        email: user.email,
        password: 'notuserpassword'
      })
    })
    .then(response => {
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toEqual('Email or password is incorrect.');
    })
  })
})
