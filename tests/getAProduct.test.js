const request = require('supertest')
const app = require('../src/index')
//const jest = require('jest')
// jest.useFakeTimers()
describe('API test', () => {
  it('get a product', async () => {
    const res = await request(app).get('/api/getProduct/5ebd4d5264d02501ec29f137')
      //.send()
    expect(res.statusCode).toEqual(201)
    //expect(res.body).toHaveProperty('_id')
  })
})