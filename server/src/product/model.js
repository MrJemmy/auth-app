const mongoose = require("mongoose")

// trim and lower case
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    images: {
        thumbnail: { type: String, default: "" },
        medium: { type: String, default: "" },
        large: { type: String, default: "" }
    },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0
    },
    tags: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product