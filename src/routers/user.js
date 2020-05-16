const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controllers/user')

const router = new express.Router()

//signup new users
router.post('/api/users/signup', userController.signup)

//login for users
router.post('/api/users/login', userController.login)

//logout user
router.post('/api/users/logout', auth, userController.logout)

//logout from all sessions
router.post('/api/users/logoutAll', auth, userController.logoutAll)

//read profile
router.get('/api/users/me', auth, userController.getProfile)

//update user profile
router.patch('/api/users/me', auth, userController.updateProfile)

//add to cart
router.patch('/api/users/addtocart', auth, userController.addToCart)

//place an order
router.patch('/api/users/placeOrder', auth, userController.placeOrder)

//show cart
router.get('/api/users/me/cart', auth, userController.getCart)

//show orders
router.get('/api/users/me/orders', auth, userController.getOrders)

//clear cart
router.patch('/api/users/me/clearcart', auth, userController.clearCart)

module.exports = router