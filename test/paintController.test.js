const request = require('supertest');
const express = require('express');
const Paint = require('../models/paint');
const controller = require('../controllers/paintController');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.post('/paint/create', controller.paint_create_post);

app.response.render = function (view, locals) {
  this.status(200).json({ view, locals });
};

describe('paint_create_post', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Paint.prototype.save = jest.fn().mockResolvedValue();
  });
  it('rejects percentages that do not sum to 100', async () => {
    const res = await request(app).post('/paint/create').type('form').send({
      name: 'Sunset Orange',
      hexValue: '#ff8800',
      description: 'A warm orange',
      paint1Hex: '#ff0000',
      paint1Percent: 50,
      paint2Hex: '#ffff00',
      paint2Percent: 40,
    });

    expect(res.body.view).toBe('paint_form');
    expect(res.body.locals.errors[0].msg).toMatch(/add up to 100/);
    expect(Paint.prototype.save).not.toHaveBeenCalled();
  });

  it('saves a valid paint with no recipe and redirects', async () => {
    Paint.prototype.save = jest.fn().mockResolvedValue();

    const res = await request(app).post('/paint/create').type('form').send({
      name: 'Teal',
      hexValue: '#008080',
    });

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/');
    expect(Paint.prototype.save).toHaveBeenCalledTimes(1);
  });
});
