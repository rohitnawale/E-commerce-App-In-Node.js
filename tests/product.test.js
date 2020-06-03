const request = require('supertest')
const app = require('../src/index')
const mongoose = require('mongoose')
const Product = require('../src/models/product')

const productOneId = new mongoose.Types.ObjectId()

const productOne = {
    _id: productOneId,
	"name": "Chicken 250gm pack",
	"price": 10,
	"priceTag": "per item",
	"category": "Eggs and Chicken",
	"quantity": 400
	
}

beforeEach (async () => {
    await Product.deleteMany()
    await new Product(productOne).save()
})

describe('API test', () => {
    it('should add a new product', async () => {
      const res = await request(app).post('/api/addProduct')
          .send(
            {
                "name": "Eggs",
                "price": 10,
                "priceTag": "per item",
                "category": "Eggs and Chicken",
                "quantity": 400
                
            }
          )
        
      expect(res.statusCode).toEqual(200)
    })
  })



  describe('API test', () => {
    it('should get products by category', async () => {
      const res = await request(app).get('/api/products/Eggs-and-Chicken')
          .send()
        
      expect(res.statusCode).toEqual(200)
    })
  })

  describe('API test', () => {
    it('should get a product by id', async () => {
      const res = await request(app).get(`/api/getProduct/${productOneId}`)
          .send()
        
      expect(res.statusCode).toEqual(201)
    })
  })

  describe('API test', () => {
    it('should update a product by id', async () => {
      const res = await request(app).patch(`/api/updateProduct/${productOneId}`)
          .send({
            "quantity":310
        })
        
      expect(res.statusCode).toEqual(200)
    })
  })

  describe('API test', () => {
    it('should delete a product by id', async () => {
      const res = await request(app).delete(`/api/products/${productOneId}`)
          .send()
        
      expect(res.statusCode).toEqual(200)
    })
  })