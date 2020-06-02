const request = require('supertest')
const app = require('../src/index')
//const jest = require('jest')
// jest.useFakeTimers()
describe('API test', () => {
  it('delete a product', async () => {
    const res = await request(app).patch('/api/products/5ebe95d25e6f7f3e904c0a55')
      .send({
        "quantity":310
    })
    expect(res.statusCode).toEqual(200)
    //expect(res.body).toHaveProperty('_id')
  })
})