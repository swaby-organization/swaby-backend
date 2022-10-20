const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);

describe('check item endpoints ', () => {

  it('check get all items ', async () => {
    const res = await request.get('/items');
    expect(res.status).toEqual(200);
  });

  it('check get one item by ID ', async () => {
    const res = await request.get('/items/1');
    expect(res.status).toEqual(200);
  });

  it('check get ItemsByUser', async () => {
    const res = await request.get('/itemsbyuser/1');
    expect(res.status).toEqual(200);
  });

  it('check create item', async () => {
    const res = await request.post('/items').send({
      "name": "item",
      "description": "item description",
      "estimatedValue": 25,
      "category": "Antique",
      "owner": 1,
      "cityOfSwap": "Amman",
      "countryOfSwap": "Jordan",
      "swapFor": "Anything",
      "uploadedImages": ['']
    });
    expect(res.status).toEqual(200);
  });

  it('check edit item by id', async () => {
    const res = await request.post('/items/1').send({
      "name": "item",
      "description": "item description",
      "estimatedValue": 25,
      "category": "Antique",
      "owner": 1,
      "cityOfSwap": "Amman",
      "countryOfSwap": "Jordan",
      "swapFor": "Anything",
      "uploadedImages": ['']
    });
    expect(res.status).toEqual(200);
  });

  it('check delete item by id', async () => {
    const res = await request.delete('/items/11');
    expect(res.status).toEqual(200);
  }
  );

});