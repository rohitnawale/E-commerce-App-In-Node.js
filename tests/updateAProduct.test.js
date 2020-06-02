const request = require('supertest')
const app = require('../src/index')
//const jest = require('jest')
// jest.useFakeTimers()
describe('API test', () => {
  it('update a product', async () => {
    const res = await request(app).patch('/api/updateProduct/5ebd4d3164d02501ec29f136')
      .send({
        "quantity":310
    })
    expect(res.statusCode).toEqual(200)
    //expect(res.body).toHaveProperty('_id')
  })
})