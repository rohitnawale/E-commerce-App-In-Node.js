const Product = require('../models/product')

//add products
exports.addProduct = async(req, res) => {
    //console.log(req.body)
    const product = new Product(req.body)
    try{
        await product.save()
        res.status(200).send(product)
    }
    catch(e){
        res.status(400).send(e)
    }
}


//get products
// GET/api/products/<category>/limit=10&skip=10
exports.getProducts = async(req, res) => {
    const category = (req.params.category.toString()).replace(/-/g," ")
    //console.log(category, req.query.limit, req.query.skip)
    try{
        const products = await Product.find({category}).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
        if(!products){
            return res.status(404).send()
        }
        res.send(products)
    }
    catch(e){
        res.status(500).send()
    }
}

//get a product
exports.getAProduct = async(req, res) => {
    const _id = req.params.productId
    try{
        const product = await Product.findById(_id)
        if(!product){
            return res.status(404).send("Product not found")
        }
        res.status(201).send(product)
    }
    catch(e){
        res.status(500).send(e)
    }
}

//update products
 exports.updateProducts = async(req, res) => {
    // res.send(req.params.productId)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'quantity', 'name']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send("error: Invalid Update")
    }
    try{
        const product = await Product.findById(req.params.productId)

        if(!product){
            return res.status(404).send("error: Product not found")
        }
        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.status(200).send(product)
    }
    catch(e){
        res.status(500).send(e)
    }
}

// delete a product
exports.deleteProduct = async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete({_id: req.params.productId})
        if(!product){
            return res.status(404).send("error: Product not found")
        }
        res.status(200).send(product)
    }
    catch(e){
        res.status(500).send(e)
    }
}