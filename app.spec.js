var shell = require('shelljs');
var request = require('supertest');
var app = require('./app');

describe('API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  })

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });

  afterEach(() => {
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('test account creation endpoint', () => {
    test('returns an API key when correct information is passed', () => {
      return request(app)
      .post('/api/v1/users')
      .send({
        email: 'user@example.com',
        password: 'password',
        password_confirmation: 'password'
      })
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(Object.keys(response.body)).toContain('api_key')
      });
    });
  });
});
