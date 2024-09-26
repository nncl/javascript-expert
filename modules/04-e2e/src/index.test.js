const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API suite test', () => {
  let app;

  before(done => {
    app = require('./index');
    app.once('listening', done)
  })

  after(done => app.close(done));

  describe('/contact:get', () => {
    it('should request contact route and return 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200);

      assert.strictEqual(response.text, "Contact here");
    });
  });

  describe('/login:post', () => {
    it('should request login route and return 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'cauealmeida', password: '123' })
        .expect(200);

      assert.strictEqual(response.text, "Login succeeded!");
    });

    it('should request login route and return 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'cauealmeida', password: '1234' })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, "Login failed!");
    });
  });

  describe('/hi:get - 404', () => {
    it('should request login route and return 200', async () => {
      const response = await supertest(app)
        .get('/hi')
        .expect(404);

      assert.strictEqual(response.text, "Not found");
    });
  });
});