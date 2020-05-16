const User = require('../models/user')
const Product = require('../models/product')

//add new users
exports.signup = async(req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    }
    catch(e){
        res.status(400).send(e)
    }
   
}

// user login
exports.login = async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }
    catch(e){
        res.status(400).send(e)
    }
}

// logout user
exports.logout =  async (req, res) => {
    try{
        //logout user from current session only
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        //console.log(req.user.tokens.length)
        res.send("You have logged out")
    }
    catch(e){
        res.status(500).send()
    }
}

//logout from all sessions
exports.logoutAll = async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send("You have logged out from all sessions")
    }
    catch(e){
        res.status(500).send()
    }
}

//read profile
exports.getProfile = async(req, res) => {
    try{
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
}

//update profile
exports.updateProfile = async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'mobile', 'address', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send("Invalid update")
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        res.send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
}

//add to cart
exports.addToCart = async(req, res) => {
    try{
        const cart = req.user['cart']
        cart.push(req.body)
        req.user['cart'] = cart
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
}

//place an order
exports.placeOrder = async(req, res) => {
    try{
        req.user['orders'].push(req.body)
        req.body['products'].forEach(product =>{
            // reduce the quantity of the product in database
            Product.findByIdAndUpdate(product['productid'], {"$inc": {"quantity": - product['items']}}, {new:true, runValidators:true}, (err, data) => {
                console.log(data)
            })            
        })
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
}

//show cart
exports.getCart = async(req, res) => {
    try{
        var promises = []
        var items = []
        //find the product for productid in cart
        req.user['cart'].forEach(element => {
            const p = Product.findById(element['productid'])
            promises.push(p)
            items.push(element['items'])
        })

        /*promises array contains actual product and
          items contain number of items in cart for
          respective product */

        Promise.all(promises).then((products) => {
            res.status(400).send({products, items})
        }) 
    }
    catch(e){
        res.status(404).send(e)
    }
}

//show orders
exports.getOrders = async (req, res) => {
    try{
        const promises = []
        const orders = []
        //find the product for productid in orders
        req.user['orders'].forEach(element => {
            element['products'].forEach(product => {
                const p = Product.findById(product['productid'])
                promises.push(p)
                orders.push(element)
                
            })
        })

        Promise.all(promises).then((products) => {
            // return an array of orders and products in each orders
            let listOfOrders = []
            for(let i=0; i< promises.length; i++){
                listOfOrders.push({products :products[i], orders:orders[i]})
            }
            res.status(200).send(listOfOrders)
        })
        
    }
    catch(e){
        res.status(400).send(e)
    }
}

//clear cart
exports.clearCart = async(req, res) => {
    try{
        req.user['cart'] = []
        await req.user.save()
        res.status(200).send(req.user['cart'])
    }
    catch(e){
        res.status(400).send(e)
    }
}