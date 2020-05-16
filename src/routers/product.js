const express = require('express')
const auth = require('../middleware/auth')
const Product = require('../models/product')
const productController = require('../controllers/product')

const router = new express.Router()

//upload product
router.post('/api/addProduct', productController.addProduct)

//get products
router.get('/api/products/:category', productController.getProducts)

//get a product
router.get('/api/getProduct/:productId', productController.getAProduct)

//update products
router.patch('/api/updateProduct/:productId', productController.updateProducts)

//delete a product
router.delete('/api/products/:productId', productController.deleteProduct)

module.exports = router