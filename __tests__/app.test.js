const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  db.destroy();
});

describe('/api/categories', () => {
  it('GET 200 - responds with an array of categories', async () => {
    const { body } = await request(app).get('/api/categories').expect(200);
    expect(body.categories).toBeArray();
    expect(body.categories.length).toBe(3);
    body.categories.forEach((category) => {
      expect(category).toEqual(
        expect.objectContaining({
          category_name: expect.any(String),
        })
      );
    });
  });
});
