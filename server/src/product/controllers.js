const ObjectId = require('mongoose').Types.ObjectId;
const Product = require("./model")
const User = require("../user/model")
const { SIZES } = require("./const")
const { resizeImages, unlinkImages } = require("../utils/image")

const getAll = async (req, res) => {

    try {
        const products = await Product.find().populate({ path: "user", select: "username" }).select("-__v")

        return res.json({
            data: products
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }

}

const getOne = async (req, res) => {
    try {
        const productId = req.params["productId"]

        if (!ObjectId.isValid(productId)) return res.json({ msg: "in valid Product id" })

        const product = await Product.findOne({
            _id: productId
        }).select("-__v")

        if (!product) return res.json({ msg: "product not found" })

        return res.json({
            data: product
        })

    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}


const createOne = async (req, res) => {
    try {

        const { name, price, desc, tags } = req.body

        const userId = req.session.user.id

        const user = await User.findById(userId)

        if (!user) return res.json({ msg: "user not found" })

        let images = {}

        if (req.file?.filename) {
            images = await resizeImages(req.file, SIZES)
        }

        const product = await Product.create({ name, price: Number(price), desc, tags, user: userId, images })
        user.products.push(product._id)
        user.save()


        return res.json({
            msg: "Product created"
        })

    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}


const updateOne = async (req, res) => {
    try {
        const productId = req.params["productId"]

        if (!ObjectId.isValid(productId)) return res.json({ msg: "in valid Product id" })

        const product = await Product.findOne({
            _id: productId,
            user: req.session.user.id
        })

        let images = ""

        if (req.file?.filename) {
            unlinkImages(product.images)
            images = await resizeImages(req.file, SIZES)
        }

        if (!product) return res.json({ msg: "product not found" })

        const { name, price, desc, tags } = req.body

        await Product.findByIdAndUpdate(productId, { name, price, desc, tags, images })

        return res.json({
            msg: "Product Updated"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}


const deleteOne = async (req, res) => {
    try {
        const productId = req.params["productId"]
        const userId = req.session.user.id

        const user = await User.findById(userId)

        if (!user) return res.json({ msg: "user not found" })

        if (!ObjectId.isValid(productId)) return res.json({ msg: "in valid Product id" })

        const product = await Product.findOne({
            _id: productId,
            user: userId
        })


        if (!product) return res.json({ msg: "product not found" })

        unlinkImages(product.images)

        await Product.deleteOne({
            _id: productId
        })

        await user.products.pull(productId)
        await user.save()

        return res.json({
            msg: "Product Deleted Sucessfully"
        })

    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}

module.exports = { getAll, getOne, createOne, updateOne, deleteOne }