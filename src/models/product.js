const mongoose = require("mongoose")
const validator = require('validator')
const productSchema = new mongoose.Schema({
    name: {
        type: "String",
        trim: true,
        required: true
    },

    price: {
        type: "Number",
        required: true,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('price must be positive number')
            }
        }
    },

    priceTag: {
        type: "String",
        required: true
    },

    imgLink: {
        type: "String",
        required: true,
        trim: true
    },

    section: {
        type: "String",
        required: true,
        trim: true
    },

    category: {
        type: "String",
        required: true,
        trim: true
    },

    quantity: {
        type: "Number"
    }
})

productSchema.methods.toJSON = function(){
    const product = this
    const productObject = product.toObject()

    return productObject
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product