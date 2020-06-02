const request = require('supertest')
const app = require('../src/index')
//const jest = require('jest')
jest.useFakeTimers()
describe('API test', () => {
  it('get products', async () => {
    const res = await request(app).get('/api/products/Fruits')
      //.send()
    expect(res.statusCode).toEqual(200)
    //expect(res.body).toHaveProperty('_id')
  })
})