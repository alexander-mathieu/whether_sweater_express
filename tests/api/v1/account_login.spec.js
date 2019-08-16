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
    // shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');

    return User.create({
                        email: 'userlogin@example.com',
                        password: _hashedPassword('password'),
                        api_key: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
                      })
  })

  afterAll(() => {
    shell.exec('npx sequelize db:seed:undo:all');
    shell.exec('npx sequelize db:migrate:undo:all');
  })

  test('returns an API key when correct information is passed', () => {
    return request(app)
    .post('/api/v1/sessions')
    .send({
      email: 'userlogin@example.com',
      password: 'password'
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body)).toContain('api_key');
    })
  })

  test('returns an error when incorrect email is sent', () => {
    return request(app)
    .post('/api/v1/sessions')
    .send({
      email: 'notuserlogin@example.com',
      password: 'password'
    })
    .then(response => {
      expect(response.statusCode).toBe(401);
      expect(Object.values(response.body)).toContain('Email or password is incorrect.');
    })
  })

  test('returns an error when incorrect password is sent', () => {
    return request(app)
    .post('/api/v1/sessions')
    .send({
      email: 'userlogin@example.com',
      password: 'notpassword'
    })
    .then(response => {
      expect(response.statusCode).toBe(401);
      expect(Object.values(response.body)).toContain('Email or password is incorrect.');
    })
  })
})
