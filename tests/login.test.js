const request = require('supertest')
const app = require('../src/index')
//const jest = require('jest')
jest.useFakeTimers()
describe('API test', () => {
  it('login', async () => {
    const res = await request(app).post('/api/users/login')
        .send(
            {
                "email":"johnsnoww@gmail.com",
                "password":"Red@1234"
            }
        )
      //.send()
    expect(res.statusCode).toEqual(200)
    //expect(res.body).toHaveProperty('_id')
  })
})