const request = require('supertest')
const app = require('../src/index')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()

const userOne =  {
    _id:userOneId,
    "name": {
        "firstName": "Ross",
        "lastName": "Mike"
    },
    
    "address": {
        "house": "301",
        "city": "Pune",
        "pincode": 411044
    },
    
    "mobile": 9988721432,
    "email": "rossmike@gmail.com",
    "password": "Red@1234",
    tokens: [{
        token: jwt.sign({_id:userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach (async () => {
    await User.deleteMany()
    await new User(userOne).save()
})



describe('API test', () => {
  it('should create new user', async () => {
    const res = await request(app).post('/api/users/signup')
        .send(
            {
                "name": {
                    "firstName": "Jon",
                    "lastName": "Snow"
                },
                
                "address": {
                    "house": "301",
                    "city": "Pune",
                    "pincode": 411044
                },
                
                "mobile": 9988776677,
                "email": "jonsnow@gmail.com",
                "password": "Red@1234"
            }
        )
      //.send()
    expect(res.statusCode).toEqual(200)
  })
})

describe('API test', () => {
    it('login a user with correct details', async () => {
      const res = await request(app).post('/api/users/login')
          .send(
              {
                  "email":"rossmike@gmail.com",
                  "password":"Red@1234"
              }
          )
        
      expect(res.statusCode).toEqual(200)
    })
  })

  describe('API test', () => {
    it('login fail for incorrect details', async () => {
      const res = await request(app).post('/api/users/login')
        .send(
              {
                  "email":"rossmike@gmail.com",
                  "password":"Red@124"
              }
          )
        
      expect(res.statusCode).toEqual(400)
    })
  })

  describe('API test', () => {
    it('should get user profile', async () => {
      const res = await request(app).get('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(
              {
                  "email":"rossmike@gmail.com",
                  "password":"Red@1234"
              }
          )
        
      expect(res.statusCode).toEqual(200)
    })
  })

  describe('API test', () => {
    it('should update user profile', async () => {
      const res = await request(app).patch('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(
              {
                  "mobile": 7777777777
              }
          )
        
      expect(res.statusCode).toEqual(200)
    })
  })


  describe('API test', () => {
    it('should logout user', async () => {
      const res = await request(app).post('/api/users/logout')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        
      expect(res.statusCode).toEqual(200)
    })
  })

  describe('API test', () => {
    it('should delete user profile', async () => {
      const res = await request(app).delete('/api/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        
      expect(res.statusCode).toEqual(200)
    })
  })