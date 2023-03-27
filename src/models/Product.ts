const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    name: String,
    description: String,
    price: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Product