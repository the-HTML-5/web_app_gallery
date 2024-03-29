const supertest = require('supertest');
const mongoose = require('mongoose');

const db = require('../../tests/db');
const app = require('../app');
const { dummyWebApp, dummyUser } = require('../../tests/data');
const WebApp = require('./webapp.model');

const request = supertest(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /webapp', () => {
  it('should create and return new web application when authenticated', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    const res = await r
      .post('/api/webapp')
      .send({ appUrl: 'https://news.google.com', category: 'news' })
      .expect(201);

    expect(res.body.status).toBe('ok');
    expect(res.body.data.description).not.toBe('');
  });

  it('should return error when not authenticated', async () => {
    const res = await request
      .post('/api/webapp')
      .send({ appUrl: 'https://news.google.com', category: 'news' })
      .expect(401);

    expect(res.body.status).toBe('error');
    expect(res.body.data).not.toBe('must be authenticated');
  });

  it('should return error when url not provided', async () => {
    const r = supertest.agent(app);
    await r.post('/api/signup').send(dummyUser);
    const res = await r
      .post('/api/webapp')
      .send({ category: 'news' })
      .expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('"appUrl" is required');
  });
});

describe('GET /webapp/:id', () => {
  it('should return single webapp', async () => {
    const testApp = await WebApp.create(dummyWebApp);
    const res = await request.get(`/api/webapp/${testApp._id}`).expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.data.manifestURL).toEqual(testApp.manifestURL);
    expect(res.body.data.name).toEqual(testApp.name);
  });

  it('should should return error when app does not exist', async () => {
    const res = await request
      .get(`/api/webapp/${mongoose.Types.ObjectId()}`)
      .expect(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('web app not found');
  });
});

describe('GET /webapp', () => {
  it('should return list of webapps', async () => {
    for (let i = 0; i < 20; i++) {
      const app = { ...dummyWebApp, manifestURL: `test${i}` };
      await WebApp.create(app);
    }

    const req = await request.get('/api/webapp').expect(200);
    expect(req.body.status).toBe('ok');
    expect(req.body.data.length).toBe(10); // default limit
  });

  it('should error with out of bound query page', async () => {
    for (let i = 0; i < 20; i++) {
      const app = { ...dummyWebApp, manifestURL: `test${i}` };
      await WebApp.create(app);
    }

    const req = await request.get('/api/webapp?page=5').expect(400);
    expect(req.body.status).toBe('error');
  });

  it('should return specified limit of webapps and requested page', async () => {
    for (let i = 0; i < 20; i++) {
      const app = { ...dummyWebApp, manifestURL: `test${i}` };
      await WebApp.create(app);
    }

    const req = await request.get('/api/webapp?limit=5&page=2').expect(200);
    expect(req.body.status).toBe('ok');
    expect(req.body.data.length).toBe(5);
    expect(req.body.page).toBe(2);
  });

  it('should return matching search requests', async () => {
    await WebApp.create(dummyWebApp);
    await WebApp.create({ ...dummyWebApp, manifestURL: 'test', name: 'apple' });

    const req = await request.get('/api/webapp?search=google').expect(200);
    expect(req.body.data.length).toBe(1);
    expect(req.body.data[0].name).toBe('google maps');
  });

  it('should return search and limit request, and paginate accordingly', async () => {
    for (let i = 0; i < 10; i++) {
      const app = { ...dummyWebApp, manifestURL: `test${i}` };
      await WebApp.create(app);
    }
    await WebApp.create({ ...dummyWebApp, manifestURL: 'test', name: 'apple' });

    let req = await request
      .get('/api/webapp?search=google&limit=5')
      .expect(200);
    expect(req.body.data.length).toBe(5);
    expect(req.body.data[0].name).toBe('google maps');
    req = await request
      .get('/api/webapp?search=google&limit=5&page=2')
      .expect(200);
    expect(req.body.data.length).toBe(5);
    expect(req.body.data[0].name).toBe('google maps');
  });

  it('should return results for requested category', async () => {
    for (let i = 0; i < 10; i++) {
      const app = { ...dummyWebApp, manifestURL: `test${i}` };
      await WebApp.create(app);
    }
    await WebApp.create({
      ...dummyWebApp,
      manifestURL: 'test',
      category: 'sports',
    });

    let req = await request.get('/api/webapp?category=sports').expect(200);

    expect(req.body.data.length).toBe(1);
    expect(req.body.data[0].category).toBe('sports');
  });
});
