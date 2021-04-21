const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  db.destroy();
});

describe('GET /api/categories', () => {
  it('200 - responds with an array of categories', async () => {
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

describe('POST /api/categories', () => {
  it('201 - responds with the created category', async () => {
    const { body } = await request(app)
      .post('/api/categories')
      .send({ category_name: 'Antiques' })
      .expect(201);

    expect(body.category).toEqual(
      expect.objectContaining({
        category_name: 'Antiques',
      })
    );
  });
  it('400 - when missing required keys', async () => {
    const { body } = await request(app)
      .post('/api/categories')
      .send({})
      .expect(400);
    expect(body.msg).toBe('category_name is a required field');
  });
});

describe('GET /api/users', () => {
  it('GET 200 - responds with an array of users', async () => {
    const { body } = await request(app).get('/api/users').expect(200);
    expect(body.users).toBeArray();
    expect(body.users.length).toBe(4);
    body.users.forEach((user) => {
      expect(user).toEqual(
        expect.objectContaining({
          username: expect.any(String),
          avatar_url: expect.any(String),
        })
      );
    });
  });
});

describe('POST /api/users', () => {
  it('201 - responds with the created user', async () => {
    const { body } = await request(app)
      .post('/api/users')
      .send({ username: 'Doug', avatar_url: 'https://test.com/doug.jpg' })
      .expect(201);

    expect(body.user).toEqual(
      expect.objectContaining({
        username: 'Doug',
        avatar_url: 'https://test.com/doug.jpg',
      })
    );
  });
  it('400 - for missing keys', async () => {
    const { body } = await request(app)
      .post('/api/users')
      .send({ avatar_url: 'https://test.com/doug.jpg' })
      .expect(400);

    expect(body.msg).toBe('username is a required field');
  });
  it('400 - for invalid keys', async () => {
    const { body } = await request(app)
      .post('/api/users')
      .send({ username: 'Doug'.repeat(100) })
      .expect(400);

    expect(body.msg).toBe('username must be at most 255 characters');
  });
  it('400 - for additional keys', async () => {
    const { body } = await request(app)
      .post('/api/users')
      .send({
        username: 'Doug',
        avatar_url: 'https://test.com/doug.jpg',
        extra: true,
      })
      .expect(400);

    expect(body.msg).toBe('Unexpected additional key: extra');
  });
});

describe('GET /api/users/:username', () => {
  it('200 - responds with the requested user', async () => {
    const { body } = await request(app).get('/api/users/Paul-R').expect(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        username: 'Paul-R',
        avatar_url: 'https://test.com/Paul-R.jpg',
        kudos: 0,
      })
    );
  });
  it('200 - responds with the number of items in the users basket', async () => {
    const { body } = await request(app).get('/api/users/Paul-R').expect(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        items_in_basket: 2,
      })
    );
  });
  it('200 - responds with the number of items the user has ordered', async () => {
    const { body } = await request(app).get('/api/users/Paul-R').expect(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        items_ordered: 1,
      })
    );
  });
  it('200 - responds with 0 if the user has no orders or items in their basket', async () => {
    const { body } = await request(app).get('/api/users/Ant').expect(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        items_ordered: 0,
        items_in_basket: 0,
      })
    );
  });
});

describe('PATCH /api/users/:username', () => {
  it('200 - responds with the updated user', async () => {
    const { body } = await request(app)
      .patch('/api/users/Paul-R')
      .send({
        avatar_url: 'newUrl',
        kudos_inc: 1,
      })
      .expect(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        username: 'Paul-R',
        avatar_url: 'newUrl',
        kudos: 1,
        items_in_basket: 2,
        items_ordered: 1,
      })
    );
  });
  it('200 - updated usernames are cascaded', async () => {
    const { body } = await request(app)
      .patch('/api/users/Paul-R')
      .send({
        username: 'Paul-the-third',
      })
      .expect(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        username: 'Paul-the-third',
        avatar_url: 'https://test.com/Paul-R.jpg',
        kudos: 0,
        items_in_basket: 2,
        items_ordered: 1,
      })
    );
  });
  it('400 - invalid body', async () => {
    const { body } = await request(app)
      .patch('/api/users/Paul-R')
      .send({
        kudos_inc: 1.5,
      })
      .expect(400);
    expect(body.msg).toBe('kudos_inc must be an integer');
  });
  it('400 - usernames cannot have spaces', async () => {
    const { body } = await request(app)
      .patch('/api/users/Paul-R')
      .send({
        username: 'Paul R',
      })
      .expect(400);
    expect(body.msg).toBe('usernames cannot contain spaces');
  });
});

describe('GET /api/items', () => {
  it('200 - responds with all items that have not been ordered', async () => {
    const { body } = await request(app).get('/api/items').expect(200);

    expect(body.items).toBeArray();
    expect(body.items.length).toBe(6);

    body.items.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({
          item_name: expect.any(String),
          description: expect.any(String),
          img_url: expect.any(String),
          price: expect.any(Number),
          category_name: expect.any(String),
        })
      );
    });
  });
  it('200 - items are sorted by item name by default', async () => {
    const { body } = await request(app).get('/api/items').expect(200);
    expect(body.items).toBeSortedBy('item_name');
  });
  it('200 - items are sorted by a passed column and order', async () => {
    const { body } = await request(app)
      .get('/api/items?sort_by=price&order=desc')
      .expect(200);
    expect(body.items).toBeSortedBy('price', { descending: true });
  });
  it('400 - for invalid sort_by', async () => {
    const { body } = await request(app)
      .get('/api/items?sort_by=invalid')
      .expect(400);
    expect(body.msg).toBe(
      'sort_by must be one of the following values: item_id, item_name, price, category_name'
    );
  });
  it('400 - for invalid order', async () => {
    const { body } = await request(app)
      .get('/api/items?order=invalid')
      .expect(400);
    expect(body.msg).toBe(
      'order must be one of the following values: asc, desc'
    );
  });
  it('200 - items can be filtered by category_name', async () => {
    const { body } = await request(app)
      .get('/api/items?category_name=Electronics')
      .expect(200);
    body.items.forEach((item) => {
      expect(item.category_name).toBe('Electronics');
    });
  });
  it('404 - for a non-existent category_name', async () => {
    const { body } = await request(app)
      .get('/api/items?category_name=Missing')
      .expect(404);
    expect(body.msg).toBe('category not found');
  });
  it('200 - results can be paginated with a limit and p query', async () => {
    const { body } = await request(app)
      .get('/api/items?sort_by=item_id&limit=2&p=2')
      .expect(200);
    console.log(body.items);
    expect(body.items.length).toBe(2);
    const [item3, item4] = body.items;
    expect(item3.item_id).toBe(3);
    expect(item4.item_id).toBe(4);
  });
  it.only('400 - if both limit and p are not passed', async () => {
    const { body } = await request(app)
      .get('/api/items?sort_by=item_id&limit=2')
      .expect(400);
    console.log(body);
    expect(body.msg).toBe(
      'limit and p queries must be provided in conjunction'
    );
  });
});
